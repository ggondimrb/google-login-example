from django.db import transaction
from django.contrib.auth.models import User


def user_create(name, email, picture, password='123') -> User:

    user = User.objects.create_user(email, email, password)

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
