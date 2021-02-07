from django.db import models


class AbastractModel(models.Model):
    created = models.DateTimeField(u'创建时间', auto_now_add=True)
    modified = models.DateTimeField(u'更新时间', auto_now=True)
    deleted = models.BooleanField(u'己删除', default=False)

    class Meta:
        abstract = True