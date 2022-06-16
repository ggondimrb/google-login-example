from typing import Any, Dict
from django.core.exceptions import ValidationError
import requests

from core.services import user_get_or_create

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def google_get_user_info(access_token: str) -> Dict[str, Any]:
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        print(response.json())
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
