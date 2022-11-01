import requests
import json

username = "admin@gmail.com"
password = "password"

def test_token():
    url = 'http://localhost:8080/token'
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, auth=(username, password))

    assert response.status_code == 200

    token = response.text

    assert token.count('.') == 2

    headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    response = requests.get('http://localhost:8080/appointments', headers=headers)

    assert response.status_code == 200

