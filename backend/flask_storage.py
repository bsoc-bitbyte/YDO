from gotrue import SyncSupportedStorage
from flask import session, current_app
import os
from dotenv import load_dotenv

load_dotenv()

class FlaskSessionStorage(SyncSupportedStorage):
    def __init__(self):
        if not current_app.secret_key:
            current_app.secret_key = os.environ.get('secret_key', '')
        self.storage = session

    def get_item(self, key: str) -> str | None:
        if key in self.storage:
            return self.storage[key]

    def set_item(self, key: str, value: str) -> None:
        self.storage[key] = value

    def remove_item(self, key: str) -> None:
        if key in self.storage:
            self.storage.pop(key, None)
