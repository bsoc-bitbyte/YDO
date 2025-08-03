import os
from flask import g
from werkzeug.local import LocalProxy
from supabase.client import Client, ClientOptions
from flask_storage import FlaskSessionStorage

from dotenv import load_dotenv

load_dotenv()

# url = os.environ.get("SUPABASE_URL", "")
# key = os.environ.get("SUPABASE_KEY", "")

url="https://nbllkutffqgadnaniqtq.supabase.co"
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ibGxrdXRmZnFnYWRuYW5pcXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTU2NjUsImV4cCI6MjA2OTM5MTY2NX0.IdgV4Flch2pvjtK6Bpqc0Jbmut4PnwzuGpuXJHiDTDg"

def get_supabase() -> Client:
    if "supabase" not in g:
        g.supabase = Client(
            url,
            key,
            options=ClientOptions(
                storage=FlaskSessionStorage(),
                flow_type="implicit"
            ),
        )
    return g.supabase

supabase = LocalProxy(get_supabase) 
