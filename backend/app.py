import os

from config import Config
from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5174")

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True, origins=[app.config['FRONTEND_URL']])

app.register_blueprint(auth_bp, url_prefix='/auth')

