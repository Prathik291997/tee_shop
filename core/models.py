from django.db import models

class Enquiry(models.Model):
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=30)
    city = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    contacted = models.BooleanField(default=False)

    def __str__(self):
        return f"Enquiry: {self.name} - {self.phone}"

class Review(models.Model):
    user_name = models.CharField(max_length=150)
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField(blank=True)
    image = models.ImageField(upload_to='reviews/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Review by {self.user_name} ({self.rating})"

class SiteInfo(models.Model):
    shop_name = models.CharField(max_length=200, default='My Shop')
    phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    instagram_url = models.URLField(blank=True)
    about_html = models.TextField(blank=True)

    def __str__(self):
        return self.shop_name
