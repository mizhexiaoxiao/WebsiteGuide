from django.utils import six
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.pagination import PageNumberPagination


class CustomResponse(Response):
    def __init__(self, data=None, status=200, msg=None,
                 template_name=None, headers=None,
                 exception=False, content_type=None):

        super(Response, self).__init__(None, status=status)

        if isinstance(data, Serializer):
            msg = (
                'You passed a Serializer instance as data, but '
                'probably meant to pass serialized `.data` or '
                '`.error`. representation.'
            )
            raise AssertionError(msg)
        if not msg:
            if status >= 400:
                if not msg:
                    msg = '失败'
            elif status == 200:
                msg = '成功'

        self.data = {
            'code': status,
            'msg': msg,
            'detail': data
        }
        self.template_name = template_name
        self.exception = exception
        self.content_type = content_type

        if headers:
            for name, value in six.iteritems(headers):
                self[name] = value


class CustomPagination(PageNumberPagination):
    '''
    分页设置
    '''
    page_size = 10  # 默认每页显示多少条
    page_size_query_param = 'size'  # URL中每页显示条数的参数，该参数会覆盖page_size
