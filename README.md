<h1 align="center">WebsiteGuide</h1>

<div align="center">WebsiteGuide网址导航系统主要用于方便企业记录和管理内部系统地址，具有网址增删改查、icon图标替换等功能，后续考虑增加rbac和其他功能，欢迎使用和交流~</div>



### 环境

- Python 3.6+
- Django 2.2.13
- Djangorestframework 3.12.2
- Node 13.14
- Vue2.0

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/1.jpg)

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/2.jpg)

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/3.jpg)

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/4.jpg)

![image](https://github.com/mizhexiaoxiao/WebsiteGuide/blob/main/websiteapp/media/sample-picture/5.jpg)

### 演示地址

http://demo.mizhexiao.top:8000/

username：admin

password：admin@1234

### 快速开始

##### docker安装(版本17.05+)

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

浏览器打开http://localhost:8000

username：admin

password：admin@1234

### 联系作者

QQ：1157861072