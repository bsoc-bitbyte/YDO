import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('secret_key', '')
    FRONTEND_URL = os.environ.get("FRONTEND_URL", "")
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    SESSION_FILE_DIR = os.path.join(os.getcwd(), 'flask_session')
    SESSION_USE_SIGNER = True