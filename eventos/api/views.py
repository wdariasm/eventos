from eventos.api.serializers import *
from rest_framework.decorators import *
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.filter(email=email, password=password).values("id")
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)

    return Response(user[0], status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventsList(viewsets.ModelViewSet):
    queryset = Events.objects.all().order_by('-id')
    serializer_class = EventsSerializer

    @action( methods=['put'], detail=False)
    def put(self, request, pk=None):
        events = Events.objects.get( pk=pk )
        serializer = EventsSerializer( events, data=request.data )
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data )

        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action( methods=['get'], detail=True )
    def getByUser(self, request, pk=None):
        events = Events.objects.filter(userId=pk ).order_by( '-id' )
        serializer = EventsSerializer( events, many=True )
        return Response( serializer.data )

    @action(methods=['post'], detail=True)
    def guardar(self, request):
        events = self.get_object()
        serializer = EventsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            events.save()
            return Response({'status': 'Evento creado correctamente'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action( methods=['delete'], detail=False)
    def delete(self, request, pk=None):
        events = Events.objects.get( pk=pk )
        events.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
