#!/usr/bin/env python
# -*- coding:utf-8 -*-
from rest_framework.serializers import ModelSerializer, ListSerializer
from websiteapp import models
from django.db.models import Q


class WebsiteChildSerializer(ListSerializer):

    '''重写方法过滤外键里面的数据'''
    def to_representation(self, data):
        request = self.context.get('request')
        value = request.query_params.get('search')
        if value:
            data = data.filter(Q(title__contains=value) | Q(description__contains=value))
        return super(WebsiteChildSerializer, self).to_representation(data)


class WebsiteSerializer(ModelSerializer):
    class Meta:
        list_serializer_class = WebsiteChildSerializer
        model = models.WebSite
        fields = '__all__'


class AllWebsiteDataSerializers(ModelSerializer):
    websites = WebsiteSerializer(many=True)

    class Meta:
        model = models.WebSiteGroup
        fields = ['id', 'name', 'websites']


'''查方法序列化器，因为增加depth递归深度参数，外键自动变为只读，无法操作'''

class GetWebsiteDataSerializers(ModelSerializer):
    class Meta:
        model = models.WebSite
        fields = '__all__'
        depth = 1


'''增删改序列化器'''

class UpdateWebsiteDataSerializers(ModelSerializer):
    class Meta:
        model = models.WebSite
        fields = '__all__'


