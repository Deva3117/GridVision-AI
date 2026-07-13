import random

substation = {
    "status": "ONLINE",
    "voltage": 220,
    "current": 580,
    "frequency": 50,
    "temperature": 36,
    "breaker3": "ON"
}

def update():

    substation["current"] = random.randint(540, 650)
    substation["voltage"] = random.randint(218, 222)
    substation["frequency"] = round(random.uniform(49.8, 50.2), 2)

    # Temperature depends on current
    substation["temperature"] = 30 + (substation["current"] - 540) // 8

    if substation["temperature"] >= 42:
        substation["status"] = "WARNING"
        substation["breaker3"] = "TRIPPED"
    else:
        substation["status"] = "ONLINE"
        substation["breaker3"] = "ON"

    return substation