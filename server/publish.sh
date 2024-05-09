#!/bin/bash

pnpm run build

# 定义镜像名称和容器名称
IMAGE_NAME="eevee-termbase-server"
CONTAINER_NAME="eevee-termbase-server"

# 构建镜像
docker buildx build -t $IMAGE_NAME .

# 停止并删除所有正在运行的容器
docker stop $(docker ps -aq --filter name=$CONTAINER_NAME)
docker rm $(docker ps -aq --filter name=$CONTAINER_NAME)

# 创建新的容器
docker run -d --name $CONTAINER_NAME -p 8021:8000 -p 8022:8001 $IMAGE_NAME