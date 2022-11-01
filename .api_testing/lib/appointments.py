from lib.utils import build_content_headers
from config import SESSION


class Appointments:
    def __init__(self):
        self.url = "/appointments"

    def all(self, app_url, access_token):
        headers = build_content_headers(access_token)
        response = SESSION.get(f"{app_url}{self.url}", headers=headers)
        return response
