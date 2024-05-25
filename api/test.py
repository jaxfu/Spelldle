from requests import post
from http import HTTPStatus

PREFIX_URL = "http://localhost:5000"
REGISTER_URL = PREFIX_URL + "/api/register"
LOGIN_URL = PREFIX_URL + "/api/login"
VALIDATE_SESION_URL = PREFIX_URL + "/api/validateSession"

USER_DATA = {
    "user_id": 2,
    "username": "Test",
    "password": "password",
    "first_name": "Bob",
    "last_name": "Weir",
    "session_key": "",
}


def testRegister(url):
    obj = {
        "username": USER_DATA["username"],
        "password": USER_DATA["password"],
        "first_name": USER_DATA["first_name"],
        "last_name": USER_DATA["last_name"],
    }

    res = post(url, json=obj)
    if res.status_code != HTTPStatus.OK:
        return False

    data = res.json()

    if data["valid"] is True:
        USER_DATA["session_key"] = data["session_key"]
        return True
    else:
        return False


def testLogin(url):
    obj = {
        "username": USER_DATA["username"],
        "password": USER_DATA["password"],
    }

    res = post(url, json=obj)
    if res.status_code != HTTPStatus.OK:
        return False

    data = res.json()

    return True if data["valid"] is True else False


def testValidation(url):
    obj = {"user_id": USER_DATA["user_id"], "session_key": USER_DATA["session_key"]}

    res = post(url, json=obj)
    if res.status_code != HTTPStatus.OK:
        return False

    data = res.json()

    return True if data["valid"] is True else False


if __name__ == "__main__":
    if testRegister(REGISTER_URL) is False:
        print("Register: FAIL")
        exit(0)
    else:
        print("Register: PASS")

    if testLogin(LOGIN_URL) is False:
        print("Login: FAIL")
        exit(0)
    else:
        print("Login: PASS")

    if testValidation(VALIDATE_SESION_URL) is False:
        print("Validate Session: FAIL")
        exit(0)
    else:
        print("Validate Session: PASS")
