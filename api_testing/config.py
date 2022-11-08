import logging
import re

import requests

SESSION = requests.Session()

APP_URL = "http://localhost:8080"

USERNAME_ADMIN = "admin@gmail.com"
PASSWORD_ADMIN = "password1"
USERNAME_MANAGER = "manager@gmail.com"
PASSWORD_MANAGER = "password2"
USERNAME_ASSISTANT = "assistant@gmail.com"
PASSWORD_ASSISTANT = "password3"
USERNAME_USER = "user@gmail.com"
PASSWORD_USER = "password4"

LOG = logging.getLogger()


class HideSensitiveData(logging.Filter):
    def filter(self, record):
        record.msg = str(record.msg).replace(PASSWORD_ADMIN, "*PASSWORD_ADMIN*")
        record.msg = str(record.msg).replace(PASSWORD_MANAGER, "*PASSWORD_MANAGER*")
        record.msg = str(record.msg).replace(PASSWORD_ASSISTANT, "*PASSWORD_ASSISTANT*")
        record.msg = str(record.msg).replace(PASSWORD_USER, "*PASSWORD_USER*")
        record.msg = re.sub(r'Authorization.*?,', 'Authorization\': \'*TOKEN*\', ', str(record.msg))
        return True


LOG.addFilter(HideSensitiveData())
