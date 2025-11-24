from django.contrib import admin
from .models import Enquiry, Review, SiteInfo

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name','phone','city','created_at','contacted')
    list_filter = ('contacted',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_name', 'rating', 'approved', 'created_at')
    list_filter = ('approved', 'rating')
    search_fields = ('user_name', 'comment')


@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    list_display = ('shop_name','phone')
