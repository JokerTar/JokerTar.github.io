---
sidebar: auto
---

# Docker

## 认识 Docker

Docker 就是一种虚拟机技术，比传统虚拟机（如 vmware、virtualbox）更加简单、轻量。

基于 Docker，我们可以把开发、测试环境，一键部署到任何机器上。只要改机安装了 Docker。
有了 Docker 就有了一切。

### 基本概念

![基本概念](http://beelz.oss-cn-beijing.aliyuncs.com/9ccf5889b5c9a646f20464600-347274.png)

### 基本命令

#### image 镜像

```sh
// 下载镜像
docker pull <image-name>:<tag>

// 查看所有镜像
docker images

// 删除镜像
docker rmi <image-id>

// 上传镜像 要先注册 hun.docker.com
docker push <username>/<repository>:<tag>
```

如果 `docke images` 出现 `REPOSITORY` 是 `none` 的情况，可以运行 `docker image prune` 删除

#### container

```sh
// 启动容器
docker run -p xxx:xxx -v=hostPath:containerPath -d --name <container-name> <image-name>

// -p 端口映射
// -v 数据卷，文件映射
// -d 后台运行
// --name 定义容器名称

// 查看所有容器, 加 -a 显示隐藏容器
docker ps

// 停止所有容器
docker stop <container-id>

// 删除容器, 加 -f 是强制删除
docker rm <container-id>

// 查看容器信息
docker inspect <container-id>

// 产看容器日志
docker logs <container-id>

// 进入容器控制台
docker exec -it <container-id> /bin/sh
```

```js
// 启动docker服务
service docker start

// 查看docker镜像
docker images

// 查看docker容器
docker ps

// 启动docker
docker start 容器名称
docker start 容器id

// 停止docker
docker stop 容器名称
```

## Dockerfile

一个简单的配置文件，描述如何构建一个新的 image 镜像
注意：必须是 `Dockerfile` 这个文件名，必须在项目的根目录

### 语法

```Dockerfile
FROM node:12 # 基于当前哪个镜像去构建
WORKDIR /app # 工作目录, 在执行RUN后面的shell命令前会先cd进WORKDIR后面的目录
COPY . /app  # 表示将当前文件夹（.表示当前文件夹，即Dockerfile所在文件夹）的所有文件拷贝到容器的/app文件夹中

# 构建镜像时，一般用于做一些系统配置，安装必备的软件。可有多个 RUN
RUN xxx
RUN xxx
RUN xx

# 启动
# CMD 一定最后要运行阻塞控制台程序 确保 docker 容器持续运行
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run dev && npx pm2 log

# 环境变量
ENV k1='XXX'
ENV k2='XXX'
```

### 构建

```sh
docker build -t <name> . # 最后的 '.' 指 Dockerfile 在当前目录下
docker images
```

## Docker-compose

基于 Docker 和 Docker-compose.
通过一个配置文件，就可以让你的系统一键启动所有的运行环境：nodejs mysql mongodb redis

软件设计和开发，有单一职责原则。Docker 也一样，每个容器都只负责一个服务。
如果开发环境需要多个服务（nodejs mysql mongodb redis）,就需要启动多个 Docker 容器。
要连通这多个 Docker 容器，就需要多个 Docker-compose。

### 配置文件

```yml
version: "3"
services:
  editor-server: # service name
    build:
      context: . # 当前目录
      dockerfile: Dockerfile # 基于 Dockerfile 构建
    images: editor-server # 依赖于当前 Dockerfile 创建出来的镜像
    container_name: editor-server
    ports:
      - 8081:3000 # 宿主机通过 8081 访问
  editor-redis: # service name 不重复 可以自定义
    images: redis # 引用官网 redis 镜像
    container_name: editor-redis
    ports:
      # 宿主机，可以用 127.0.0.1:6378 即可连接容器中的数据库 `redis-cli -h 127.0.0.1 -p 6378`
      # 但是，其他 docker 容器不能，因为此时 127.0.0.1 是 docker 容器本身，而不是宿主机
      - 6378:6379
    environment:
      - TZ=Asia/Shanghai # 设置时区
```

### 命令

```sh
# 构建容器
docker-compose build <service-name>

# 启动所有服务器 -d 后台启动
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看服务 只查看 docker-compose.yml 配置文件中的服务
docker-compose ps
```

### 连接 Mysql 和 Mongodb

redis 无数据库，而 mysql 和 mongodb 需要创建数据库

redis 是缓存，无需数据持久化，而 mysql 和 mongodb 需要

```yml
 editor-mysql:
    images: mysql
    container_name: editor-mysql
    restart: always # 如果容器报错 重启它
    privileged: true # 高权限 执行下面的 mysql/init
    command: --default-authentication-plugin=mysql_native_password # 远程访问
    ports:
        - 3305:3306 # 宿主机可以使用 127.0.0.1:3305 即可连接容器中的数据库
    volumes:
      # 数据持久化 地址映射 本地数据地址:容器数据地址
      - '.docker-volumes/mysql/log:/var/log/mysql' # 记录日志
      - '.docker-volumes/mysql/data:/var/lib/mysql' # 数据持久化
      - '.mysql/init:/docker-entrypoint-initdb.d' # 初始化 sql
    environment:
      - MYSQL_DATABASE=imooc_lego_course
      - MYSQL_ROOT_PASSWORD=xxx
      - TZ=Asia/Shanghai
  editor-mongo:
    images: mongo
    container_name: editor-mongo
    restart: always # 如果容器报错 重启它
    volumes:
      # 数据持久化 地址映射 本地数据地址:容器数据地址
      - '.docker-volumes/mongo/data:/data/db'
    environment:
      - MONGO_INITDB_DATABASE=imooc_lego_course
      - TZ=Asia/Shanghai
    ports:
      - 27016:27017 # 宿主机可以使用 127.0.0.1:27016 即可连接容器中的数据库
```
