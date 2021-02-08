from django.core.management.base import BaseCommand
from websiteapp.models import UserInfo


class Command(BaseCommand):
    help = '创建账户'

    def add_arguments(self, parser):
        parser.add_argument('-u', required=True, metavar='username', help='用户名')
        parser.add_argument('-p', required=True, metavar='password', help='账户密码')
        parser.add_argument('-n', default='', metavar='alias', help='姓名')
        parser.add_argument('-s', default=False, action='store_true', help='是否是超级用户（默认否）')

    def handle(self, *args, **options):
        if UserInfo.objects.filter(username=options['u']).exists():
            return self.stderr.write(self.style.ERROR(f'已存在登录名为【{options["u"]}】的用户'))
        UserInfo.objects.create(
            username=options['u'],
            alias=options['n'],
            password=UserInfo.make_password(options['p']),
            is_superuser=options['s'],
        )
        self.stdout.write(self.style.SUCCESS('创建成功'))