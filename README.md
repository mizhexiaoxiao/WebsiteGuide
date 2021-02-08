# 												           WebsiteGuide

WebsiteGuide网址导航系统基于Vue+djangorestframework开发，可用于企业内部系统导航，具有网址导航、后台管理、系统管理，后续考虑增加rbac和其他功能，欢迎使用和交流~

### 环境

- Python 3.6+
- Django 2.2.13
- Djangorestframework 3.12.2
- Node 13.14
- Vue2.0

### 快速开始

##### docker安装

```sh
yum install -y docker
systemctl start docker
```

##### 构建镜像

```sh
git clone https://github.com/mizhexiaoxiao/WebDockerfile.git
cd WebDockerfile
docker build --no-cache . -t websiteguide
```

##### 启动容器

```sh
docker run -d --restart=always --name=websiteguide -p 8000:80 websiteguide
```

##### 访问

```
http://ip:8000
```

### 联系作者

QQ：1157861072