from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.

from django.contrib import admin
from websiteapp.models import WebSite,WebSiteGroup,UserInfo

admin.site.register(UserInfo)
admin.site.register(WebSiteGroup)
admin.site.register(WebSite)