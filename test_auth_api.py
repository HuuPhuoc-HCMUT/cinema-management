import requests
import uuid

BASE = "http://localhost:8000/api"
TIMEOUT = 5


def log(msg):
    print(msg)


def register_user():
    email = f"user_{uuid.uuid4().hex[:6]}@example.com"

    payload = {
        "email": email,
        "password": "password123",
        "name": "Nguyen Van A",
        "phone": f"09{uuid.uuid4().int % 10**8:08d}",
        "dob": "1990-01-15",
        "gender": "male"
    }

    r = requests.post(
        f"{BASE}/auth/register",
        json=payload,
        timeout=TIMEOUT
    )

    log(f"[REGISTER] {r.status_code}")

    if r.status_code not in (200, 201):
        raise Exception("Register failed")

    data = r.json()
    token = data.get("token")

    if not token:
        raise Exception("No token returned from register")

    return token


def test_auth_get(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    endpoints = {
        "/auth/profile": [200],
        "/bookings/my-bookings": [200],
        "/bookings": [401, 403],
        "/bookings/1": [200, 403, 404]
    }

    for api, expected_codes in endpoints.items():
        r = requests.get(
            f"{BASE}{api}",
            headers=headers,
            timeout=TIMEOUT
        )

        status = "PASS" if r.status_code in expected_codes else "BUG"

        log(f"{api:<30} {r.status_code:<5} {status}")


if __name__ == "__main__":
    try:
        token = register_user()
        log(f"[TOKEN OK]")
        test_auth_get(token)
        log("=== DONE ===")
    except Exception as e:
        log(f"[ERROR] {e}")
