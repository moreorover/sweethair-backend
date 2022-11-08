from lib.appointments import Appointments
from config import APP_URL, LOG
import datetime


def test_all_admin(authenticate_as_admin):
    response = Appointments().all(APP_URL, authenticate_as_admin)
    assert response.ok


def test_create_admin(authenticate_as_admin):
    now_datetime = datetime.datetime.now()
    now_datetime = now_datetime.strftime('%d/%m/%Y %H:%M:%S')
    new_appointment = {"scheduledDate": "2022-11-08T22:09:10.242+00:00"}
    response = Appointments().create(APP_URL, authenticate_as_admin, new_appointment)
    assert response.status_code == 201


def test_all_manager(authenticate_as_manager):
    response = Appointments().all(APP_URL, authenticate_as_manager)
    assert response.ok


def test_all_assistant(authenticate_as_assistant):
    response = Appointments().all(APP_URL, authenticate_as_assistant)
    assert response.status_code == 403


def test_all_user(authenticate_as_user):
    response = Appointments().all(APP_URL, authenticate_as_user)
    assert response.status_code == 403
