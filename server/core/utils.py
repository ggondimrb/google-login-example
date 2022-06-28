import random
import string


def create_password() -> str:
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(8))
    return password
