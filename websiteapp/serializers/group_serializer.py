#!/usr/bin/env python
# -*- coding:utf-8 -*-
from rest_framework.serializers import ModelSerializer
from websiteapp import models

class WebsiteGroupSerializers(ModelSerializer):
    class Meta:
        model = models.WebSiteGroup
        fields = '__all__'
