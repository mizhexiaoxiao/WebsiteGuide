from websiteapp import models
from rest_framework.serializers import ModelSerializer,SerializerMethodField


class IconSerializer(ModelSerializer):
    handle_link = SerializerMethodField()

    class Meta:
        model = models.WebSite
        fields = ['icon','handle_link']

    def get_handle_link(self, instance):
        '''

        :param instance:
        :return:返回当前地址  http://localhost:8000
        '''
        request = self.context.get('request')

        return f'{request.scheme}://{request.get_host()}/'