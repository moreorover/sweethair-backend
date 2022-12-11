import json

from lib.utils import build_request_headers
from config import SESSION, LOG


class Home:
    def __init__(self):
        self.url = "/"

    def all(self, app_url, access_token):
        headers = build_request_headers(access_token)
        response = SESSION.get(f"{app_url}{self.url}", headers=headers)
        LOG.info(f"Response Headers: {response.headers}")
        return response
