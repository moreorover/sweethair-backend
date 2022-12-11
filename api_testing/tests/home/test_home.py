from lib.home import Home
from config import APP_URL, LOG
import datetime


def test_all_admin(authenticate_as_admin):
    response = Home().all(APP_URL, authenticate_as_admin)
    assert response.ok

def test_all_manager(authenticate_as_manager):
    response = Home().all(APP_URL, authenticate_as_manager)
    assert response.ok


def test_all_assistant(authenticate_as_assistant):
    response = Home().all(APP_URL, authenticate_as_assistant)
    assert response.ok


def test_all_user(authenticate_as_user):
    response = Home().all(APP_URL, authenticate_as_user)
    assert response.ok
