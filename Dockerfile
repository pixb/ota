FROM node
MAINTAINER pix<tpxsky@163.com>

# 创建工作目录
RUN mkdir -p /work/ota
ENV OTA_PATH /work/ota
WORKDIR $OTA_PATH

# 拷贝ota工程到工作目录
COPY . /work/ota

# 设置端口
EXPOSE 1337

# 启动服务器
CMD node /work/ota/index.js
# CMD sh ota-start.sh
