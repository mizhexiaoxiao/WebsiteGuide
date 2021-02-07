#!/bin/bash

cd $(dirname $(dirname $0))
exec gunicorn -b 127.0.0.1:8000 -w 2 --threads 8 --access-logfile - WebsiteGuide.wsgi