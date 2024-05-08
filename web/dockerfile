# 使用 Nginx 作为基础镜像
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

# 删除默认配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 将构建产物复制到 Nginx 的默认 HTML 目录
COPY dist /usr/share/nginx/html

# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]