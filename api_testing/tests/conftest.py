import pytest
from config import SESSION, APP_URL, USERNAME_ADMIN, PASSWORD_ADMIN, USERNAME_MANAGER, PASSWORD_MANAGER, USERNAME_ASSISTANT, PASSWORD_ASSISTANT, USERNAME_USER, PASSWORD_USER, LOG


@pytest.fixture(scope="session")
def authenticate_as_admin():
    LOG.info(f"Trying to authenticate with {USERNAME_ADMIN} -> {PASSWORD_ADMIN}")
    response = SESSION.post(f"{APP_URL}/token", auth=(USERNAME_ADMIN, PASSWORD_ADMIN))
    assert response.ok
    token = response.text
    assert token.count('.') == 2
    yield token


@pytest.fixture(scope="session")
def authenticate_as_manager():
    LOG.info(f"Trying to authenticate with {USERNAME_MANAGER} -> {PASSWORD_MANAGER}")
    response = SESSION.post(f"{APP_URL}/token", auth=(USERNAME_MANAGER, PASSWORD_MANAGER))
    assert response.ok
    token = response.text
    assert token.count('.') == 2
    yield token


@pytest.fixture(scope="session")
def authenticate_as_assistant():
    LOG.info(f"Trying to authenticate with {USERNAME_ASSISTANT} -> {PASSWORD_ASSISTANT}")
    response = SESSION.post(f"{APP_URL}/token", auth=(USERNAME_ASSISTANT, PASSWORD_ASSISTANT))
    assert response.ok
    token = response.text
    assert token.count('.') == 2
    yield token


@pytest.fixture(scope="session")
def authenticate_as_user():
    LOG.info(f"Trying to authenticate with {USERNAME_USER} -> {PASSWORD_USER}")
    response = SESSION.post(f"{APP_URL}/token", auth=(USERNAME_USER, PASSWORD_USER))
    assert response.ok
    token = response.text
    assert token.count('.') == 2
    yield token