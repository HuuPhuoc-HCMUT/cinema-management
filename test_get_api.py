import requests
import json

BASE = "http://localhost:8000/api"

ENDPOINT = [
    "/health",
    "/auth/profile",

    "/movies",
    "/movies/ongoing",
    "/movies/1", 

    "/showtimes",
    "/showtimes/movie/1",
    "/showtimes/theaters",
    "/showtimes/1",
    # seat book, seat auditorium
    "/combos",
    "/combos/CB000001"
]


for api in ENDPOINT:
    url = BASE + api
    try: 
        r = requests.get(url, timeout=5)
        status = "OK" if (r.status_code < 400) else "FAIL"
        print (f"{url:<55} {r.status_code:<5} {status}")
    except Exception as e:
        print(f"{url} --- ERROR ({e})")


    



params = {
    "theater_id": 1,
    "screen_number": 1,
    "date": "2024-12-25",
    "start_time": "14:00:00",
    "end_time": "16:30:00"
}

r = requests.get(BASE + "/showtimes", params=params)
print(r.status_code, r.text)
