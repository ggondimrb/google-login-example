from typing import Any, Dict
from django.db import transaction
from django.contrib.auth.models import User

from core.utils import create_password

from django.core.exceptions import ValidationError
import requests

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def user_create(name, email, picture, password='123') -> User:

    user = User.objects.create_user(email, email, create_password())

    user.first_name = name
    user.last_name = picture
    user.save()

    return user


@transaction.atomic
def user_get_or_create(*, email: str, **extra_data) -> User:
    user = User.objects.filter(email=email).first()

    if user:
        return user

    name = f'{extra_data["first_name"]} {extra_data["last_name"]}'
    picture = extra_data["picture"]
    return user_create(name=name, email=email, picture=picture)


def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Failed to obtain user info from Google.')

    return response.json()


def get_or_create_google_user(access_token: str):
    user_data = google_get_user_info(
        access_token=access_token)

    user = user_get_or_create(email=user_data.get('email'),
                              first_name=user_data.get('given_name'),
                              last_name=user_data.get('family_name'),
                              picture=user_data.get('picture'))

    return user
