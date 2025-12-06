import requests
import uuid

BASE = "http://localhost:8000/api"

email = f"user_{uuid.uuid4().hex[:6]}@example.com"
password = "password123"

print("EMAIL:", email)

# REGISTER
r = requests.post(
    f"{BASE}/auth/register",
    json={
        "email": email,
        "password": password,
        "name": "Nguyen Van A",
        "phone": "0901234567",
        "dob": "1990-01-15",
        "gender": "male"
    },
    timeout=5
)

print("\nREGISTER STATUS:", r.status_code)
print("REGISTER RESPONSE:", r.text)

# LOGIN
r = requests.post(
    f"{BASE}/auth/login",
    json={
        "email": email,
        "password": password
    },
    timeout=5
)

print("\nLOGIN STATUS:", r.status_code)
print("LOGIN RESPONSE:", r.text)
