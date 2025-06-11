import os
import sys
import subprocess
import platform
import signal
import time
import shutil
from pathlib import Path

class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  

flask_process = None
vite_process = None
system = platform.system().lower()

def setup_signal_handlers():
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

def signal_handler(sig, frame):
    cleanup()

def print_status(message):
    print(f"{Colors.BLUE}[INFO]{Colors.NC} {message}")

def print_success(message):
    print(f"{Colors.GREEN}[SUCCESS]{Colors.NC} {message}")

def print_warning(message):
    print(f"{Colors.YELLOW}[WARNING]{Colors.NC} {message}")

def print_error(message):
    print(f"{Colors.RED}[ERROR]{Colors.NC} {message}")

def check_command(command):
    return shutil.which(command) is not None

def check_requirements():
    required_commands = ['supabase', 'npm']
    
    python_commands = ['python3', 'python']
    python_found = any(check_command(cmd) for cmd in python_commands)
    
    if not python_found:
        print_error("Python is required but not installed. Aborting.")
        sys.exit(1)
        
    for cmd in required_commands:
        if not check_command(cmd):
            print_error(f"{cmd} is required but not installed. Aborting.")
            sys.exit(1)
            
def run_command(command, cwd=None, background=False, shell=False):
    try:
        if system == "windows":
            if background:
                return subprocess.Popen(
                    command, 
                    cwd=cwd, 
                    shell=True, 
                    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP
                )
            else:
                return subprocess.run(command, cwd=cwd, shell=True, check=True, capture_output=True, text=True)
        else:
            if background:
                return subprocess.Popen(command, cwd=cwd, shell=shell)
            else:
                return subprocess.run(command, cwd=cwd, shell=shell, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        print_error(f"Command failed: {' '.join(command) if isinstance(command, list) else command}")
        print_error(f"Error: {e}")
        raise
        
def get_python_command():
    if check_command('python3'):
        return 'python3'
    elif check_command('python'):
        return 'python'
    else:
        raise Exception("Python not found")
        
def get_pip_command():
    if check_command('pip3'):
        return 'pip3'
    elif check_command('pip'):
        return 'pip'
    else:
        raise Exception("pip not found")
        
def start_supabase():
    print_status("Starting Supabase...")
    print_warning("This may take more than a few minutes on the first run.")
    
    supabase_dir = Path("supabase")
    if not supabase_dir.exists():
        print_error("Supabase directory not found. Make sure you're in the project root.")
        sys.exit(1)
        
    run_command("supabase start", cwd=supabase_dir, shell=True)
    
    result = run_command("supabase status", cwd=supabase_dir, shell=True)
    status_lines = result.stdout.split('\n')
    
    supabase_url = None
    service_key = None
    jwt_secret = None
    
    for line in status_lines:
        if "API URL" in line:
            supabase_url = line.split()[-1]
        elif "service_role key" in line:
            service_key = line.split()[-1]
        elif "JWT secret" in line:
            jwt_secret = line.split()[-1]
            
    if not all([supabase_url, service_key, jwt_secret]):
        print_error("Failed to extract Supabase credentials")
        sys.exit(1)
        
    print_success("Supabase started successfully")
    print_status(f"API URL: {supabase_url}")
    
    return supabase_url, service_key, jwt_secret
    
def update_backend_env(supabase_url, service_key, jwt_secret):
    print_status("Updating backend/.env with Supabase credentials...")
    
    backend_dir = Path("backend")
        
    env_content = f"""SUPABASE_URL={supabase_url}
SUPABASE_KEY={service_key}

secret_key={jwt_secret}
FRONTEND_URL=http://localhost:5173
"""
    
    env_file = backend_dir / ".env"
    with open(env_file, 'w') as f:
        f.write(env_content)
        
    print_success("Backend .env updated successfully")
    
def start_flask():
    global flask_process
    backend_dir = Path("backend")
    
    print_status("Installing Python dependencies...")
    pip_cmd = get_pip_command()
    run_command(f"{pip_cmd} install -r requirements.txt", cwd=backend_dir, shell=True)
    
    print_status("Starting Flask server...")
    
    env = os.environ.copy()
    env['FLASK_APP'] = 'app.py'
    
    if system == "windows":
        flask_cmd = "python -m flask run --debug --port=5000"
    else:
        flask_cmd = [ get_python_command(),"-m", "flask", "run", "--debug", "--port=5000"]
        
    flask_process = subprocess.Popen(
        flask_cmd,
        cwd=backend_dir,
        env=env,
        shell=(system == "windows"),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True

    )
    time.sleep(2)  # Give Flask some time to start
    if flask_process.poll() is not None:
        stdout, stderr = flask_process.communicate()
        print_error("Flask server failed to start")
        print_error(f"STDOUT: {stdout}")
        raise RuntimeError(f"STDERR: {stderr}")
    print_success("Flask server started on http://localhost:5000")
    
def start_frontend():
    global vite_process
    print_status("Installing npm dependencies...")
    run_command("npm install", shell=True)
    
    print_status("Starting Vite dev server...")
    
    if system == "windows":
        vite_cmd = "npm run dev"
    else:
        vite_cmd = ["npm", "run", "dev"]
        
    vite_process = subprocess.Popen(
        vite_cmd,
        shell=(system == "windows")
    )
    
    print_success("Vite dev server started on http://localhost:5173")
    
def cleanup():
    global flask_process, vite_process
    print_warning("Shutting down services...")
    
    if flask_process and flask_process.poll() is None:
        print_status("Stopping Flask server...")
        try:
            if system == "windows":
                flask_process.terminate()
            else:
                flask_process.terminate()
            flask_process.wait(timeout=5)
        except:
            if system == "windows":
                subprocess.run(f"taskkill /F /PID {flask_process.pid}", shell=True)
            else:
                flask_process.kill()
                
    if vite_process and vite_process.poll() is None:
        print_status("Stopping Vite dev server...")
        try:
            if system == "windows":
                vite_process.terminate()
            else:
                vite_process.terminate()
            vite_process.wait(timeout=5)
        except:
            if system == "windows":
                subprocess.run(f"taskkill /F /PID {vite_process.pid}", shell=True)
            else:
                vite_process.kill()
                
    print_status("Stopping Supabase...")
    try:
        supabase_dir = Path("supabase")
        run_command("supabase stop", cwd=supabase_dir, shell=True)
    except:
        print_warning("Could not stop Supabase cleanly")
        
    print_success("Okie bye bye Good night!")
    sys.exit(0)
    
def main_run():
    global flask_process, vite_process
    try:
        print_status("YDO is blossoming 🌸")
        
        setup_signal_handlers()
        check_requirements()
        
        supabase_url, service_key, jwt_secret = start_supabase()
        update_backend_env(supabase_url, service_key, jwt_secret)
        start_flask()
        time.sleep(2)
        start_frontend()
        
        print()
        print_success("🚀 YDO Development Environment Ready!")
        print(f"{Colors.GREEN}Services running:{Colors.NC}")
        print(f"  • Supabase: {supabase_url}")
        print(f"  • Flask API: http://localhost:5000")
        print(f"  • Frontend: http://localhost:5173")
        print()
        print_warning("Press Ctrl+C to stop all services")
        
        try:
            while True:
                time.sleep(1)
                
                if flask_process and flask_process.poll() is not None:
                    print_warning("Flask server has stopped unexpectedly")
                    break
                    
                if vite_process and vite_process.poll() is not None:
                    print_warning("Vite dev server has stopped unexpectedly")
                    break
                    
        except KeyboardInterrupt:
            pass
            
    except Exception as e:
        print_error(f"An error occurred: {str(e)}")
        cleanup()
        
    finally:
        cleanup()

if __name__ == "__main__":
    main_run()
