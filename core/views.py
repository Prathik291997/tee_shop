from rest_framework import viewsets, permissions
from .models import Enquiry, Review, SiteInfo
from .serializers import EnquirySerializer, ReviewSerializer, SiteInfoSerializer
from notifications.models import Notification
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action



class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()

        return Response({
            "success": True,
            "message": "Enquiry saved successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()

        return Response({
            "success": True,
            "message": "Review submitted",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def approved(self, request):
        qs = Review.objects.filter(approved=True).order_by('-created_at')
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class SiteInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteInfo.objects.all()
    serializer_class = SiteInfoSerializer
    permission_classes = [permissions.AllowAny]

