from lib.appointments import Appointments
from config import APP_URL
import logging


def test_all(authenticate):
    response = Appointments().all(APP_URL, authenticate)
    logging.info("logthis")
    assert response.ok

