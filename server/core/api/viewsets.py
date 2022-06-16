from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import Match


class MatchListView(APIView):
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        return Response(Match.objects.all().values())
