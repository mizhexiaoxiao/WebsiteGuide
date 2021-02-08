from django.core.management.base import BaseCommand
from django.core.management import execute_from_command_line


class Command(BaseCommand):
    help = '初始化/更新数据库'

    def handle(self, *args, **options):
        execute_from_command_line(['manage.py', 'makemigrations'])
        execute_from_command_line(['manage.py', 'migrate'])
        self.stdout.write(self.style.SUCCESS('初始化/更新成功'))