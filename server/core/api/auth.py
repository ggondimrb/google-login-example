from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from core.api.services import get_or_create_google_user


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):

        if 'access_token' in request.data:
            user = get_or_create_google_user(request.data['access_token'])

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'picture': user.last_name
        })
