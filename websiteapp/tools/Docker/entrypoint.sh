#!/bin/sh
set -e

# init nginx
if [ ! -d /run/nginx ]; then
    mkdir -p /run/nginx
    chown -R nginx.nginx /run/nginx
fi

# init supervisor
if [ ! -f /run/supervisor.sock ];then
    touch /run/supervisor.sock
    chmod 777 /run/supervisor.sock
    unlink /run/supervisor.sock
fi

# init app
if [ ! -f /WebsiteGuide/db.sqlite3 ]; then
    cd /WebsiteGuide
    python manage.py updatedb
    python manage.py useradd -u admin -p admin@1234 -s -n 管理员
fi

nginx
supervisord -c /etc/supervisord.conf
