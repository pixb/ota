FROM node
MAINTAINER pix<tpxsky@163.com>

# 创建工作目录
RUN mkdir -p /work/ota
ENV OTA_PATH /work/ota
WORKDIR $OTA_PATH

# 拷贝ota工程到工作目录
COPY . $OTA_PATH

# 设置端口
EXPOSE 1337

# 切换镜像源
RUN  npm config set registry https://registry.npm.taobao.org

# 安装所需要的包
RUN sh npm_install.sh

# 启动服务器
CMD node /work/ota/index.js
# CMD sh ota-start.sh
