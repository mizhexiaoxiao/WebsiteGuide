#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.urls import path, include, re_path
from websiteapp.views import *
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('group', WebsiteGroupViewSet, basename='group')
router.register('website', WebsiteDataViewSet, basename='website')
router.register('user', UserInfoViewSet, basename='website')

urlpatterns = [
    path('', include(router.urls)),
    path('login/',UserAuthView.as_view()),
    path('icon/',IconViewSet.as_view()),
    path('alldata/', AllWebsiteDataViewSet.as_view(actions={'get': 'list'})),
    re_path('alldata/(?P<id>\d+)', AllWebsiteDataViewSet.as_view(actions={'get': 'retrieve'})),
]
