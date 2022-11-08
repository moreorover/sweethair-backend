import json

from lib.utils import build_request_headers
from config import SESSION, LOG


class Appointments:
    def __init__(self):
        self.url = "/appointments"

    def all(self, app_url, access_token):
        headers = build_request_headers(access_token)
        response = SESSION.get(f"{app_url}{self.url}", headers=headers)
        LOG.info(f"Response Headers: {response.headers}")
        return response

    def create(self, app_url, access_token, appointment):
        LOG.info("create appointment")
        # headers = build_request_headers(access_token, content_type="application/json", accept_type="*/*")
        headers = build_request_headers(access_token, content_type="application/json")
        LOG.info(f"Request body, appointment: {appointment}")
        response = SESSION.post(f"{app_url}{self.url}", headers=headers, data=json.dumps(appointment))
        LOG.info(f"Response -> {response.json()}")
        return response
