from django.urls import path, include
from rest_framework import routers
from .views import EnquiryViewSet, ReviewViewSet, SiteInfoViewSet

router = routers.DefaultRouter()
router.register(r'enquiries', EnquiryViewSet, basename='enquiry')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'siteinfo', SiteInfoViewSet, basename='siteinfo')

urlpatterns = [
    path('', include(router.urls)),
]
