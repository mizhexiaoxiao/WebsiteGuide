<h1 align="center">WebsiteGuide</h1>

<div align="center">WebsiteGuide网址导航系统主要用于企业记录和管理内部系统地址，具有网址增删改查、icon图标替换等功能，后续考虑增加rbac和其他功能，欢迎使用和交流~</div>



### 环境

- Python 3.6+
- Django 2.2.13
- Djangorestframework 3.12.2
- Node 12.20.1+
- Vue 2.0

### 网址导航

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/5.jpg)

### 支持批量添加

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/6.jpg)

### 网址管理

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/7.jpg)

### 用户管理

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/8.jpg)

### 演示地址

导航页 http://demo.mizhexiao.top:8000/

管理后台 http://demo.mizhexiao.top:8000/admin

username：admin

password：admin@1234

### 快速开始
#### 方法一：dockerhub拉取镜像

```sh
docker pull mizhexiaoxiao/websiteguide:latest 
docker run -d --restart=always --name=websiteguide -p 8000:80 mizhexiaoxiao/websiteguide
```

#### 方法二：dockerfile构建镜像
##### docker安装(版本17.05+)

```sh
yum install -y docker-ce
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

浏览器打开http://localhost:8000

管理后台http://localhost:8000/admin

username：admin

password：admin@1234

##### 数据备份与恢复

备份

/usr/bin/docker cp 63dd67259f9d:/WebsiteGuide/db.sqlite3 /opt/deploy/bak/db.sqlite3

/usr/bin/docker cp 63dd67259f9d:/WebsiteGuide/websiteapp/media opt/deploy/bak/icon

恢复

/usr/bin/docker cp /opt/deploy/bak/db.sqlite3 63dd67259f9d:/WebsiteGuide/db.sqlite3

/usr/bin/docker cp /opt/deploy/bak/icon 63dd67259f9d:/WebsiteGuide/websiteapp/media

/usr/bin/docker restart 63dd67259f9d

### 有任何问题请提issue
