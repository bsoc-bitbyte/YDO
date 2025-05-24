#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' 

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

cleanup() {
    print_warning "Shutting down services..."
    
    if [ ! -z "$FLASK_PID" ]; then
        print_status "Stopping Flask server..."
        kill $FLASK_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$VITE_PID" ]; then
        print_status "Stopping Vite dev server..."
        kill $VITE_PID 2>/dev/null || true
    fi
    
    print_status "Stopping Supabase..."
    cd supabase
    supabase stop
    cd ..
    
    print_success "Okie bye bye Good night!"
    exit 0
}

trap cleanup SIGINT SIGTERM

command -v supabase >/dev/null 2>&1 || { print_error "Supabase CLI is required but not installed. Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { print_error "Python3 is required but not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { print_error "npm is required but not installed. Aborting."; exit 1; }

print_status "YDO is blossoming 🌸"

cd supabase
supabase start

SUPABASE_URL=$(supabase status | grep "API URL" | awk '{print $3}')
SUPABASE_SERVICE_KEY=$(supabase status | grep "service_role key" | awk '{print $3}')
SECRET_KEY=$(supabase status | grep "JWT secret" | awk '{print $3}')

print_success "Supabase started successfully"
print_status "API URL: $SUPABASE_URL"

cd ../backend

cat > .env << EOF
SUPABASE_URL=$SUPABASE_URL
SUPABASE_KEY=$SUPABASE_SERVICE_KEY

secret_key=$SECRET_KEY
FRONTEND_URL=http://localhost:5173
EOF

print_success "Backend .env updated successfully"

pip install -r requirements.txt

export FLASK_APP=app.py
flask run --debug --port=5000 &
FLASK_PID=$!

print_success "Flask server started on http://localhost:5000"

cd ..
npm install

npm run dev &
VITE_PID=$!

print_success "Vite dev server started on http://localhost:5173"

echo
print_success "YDO is fully bloomed 🌸"
echo -e "${GREEN}Services running:${NC}"
echo -e "  • Supabase: $SUPABASE_URL"
echo -e "  • Flask API: http://localhost:5000"
echo -e "  • Frontend: http://localhost:5173"
echo
print_warning "Press Ctrl+C to stop all services"

wait