import pytest
from config import SESSION, APP_URL, USERNAME, PASSWORD


@pytest.fixture(scope="session")
def authenticate():
    response = SESSION.post(f"{APP_URL}/token", auth=(USERNAME, PASSWORD))
    assert response.ok
    token = response.text
    assert token.count('.') == 2
    yield token
