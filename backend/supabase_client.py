import os
from flask import g
from werkzeug.local import LocalProxy
from supabase.client import Client, ClientOptions
from flask_storage import FlaskSessionStorage

from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL", "")
key = os.environ.get("SUPABASE_KEY", "")

def get_supabase() -> Client:
    if "supabase" not in g:
        g.supabase = Client(
            url,
            key,
            options=ClientOptions(
                storage=FlaskSessionStorage(),
                flow_type="pkce"
            ),
        )
    return g.supabase

supabase = LocalProxy(get_supabase) 
