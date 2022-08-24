FROM node:14.18-alpine as web

RUN echo -e "http://mirrors.aliyun.com/alpine/v3.11/main\nhttp://mirrors.aliyun.com/alpine/v3.11/community" > /etc/apk/repositories
RUN apk update && \
    apk add --no-cache git 
RUN git clone https://github.com/mizhexiaoxiao/WebsiteGuide.git --depth=1 /WebsiteGuide && cd /WebsiteGuide
RUN cd /WebsiteGuide/websitefronted && npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install &&  npm run build

FROM python:3.6.10-alpine3.11

RUN echo -e "http://mirrors.aliyun.com/alpine/v3.11/main\nhttp://mirrors.aliyun.com/alpine/v3.11/community" > /etc/apk/repositories \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
RUN apk update && apk add --no-cache nginx mariadb git build-base supervisor bash
RUN apk add --no-cache --virtual .build-deps  openssl-dev gcc musl-dev python3-dev libffi-dev openssh-client make \
    && mkdir /etc/supervisor.d
RUN git clone https://github.com/mizhexiaoxiao/WebsiteGuide.git --depth=1 /WebsiteGuide && cd /WebsiteGuide
RUN pip config set global.index-url https://pypi.mirrors.ustc.edu.cn/simple/  && pip install --upgrade pip && pip install --no-cache-dir -r /WebsiteGuide/requirements.txt \
    && pip install --no-cache-dir gunicorn \
    && apk del .build-deps

COPY --from=web /WebsiteGuide/websitefronted/dist /WebsiteGuide/websitefronted/dist
ADD websiteguide.ini /etc/supervisor.d/websiteguide.ini
ADD default.conf /etc/nginx/conf.d/default.conf
ADD entrypoint.sh /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["sh", "/entrypoint.sh"]
