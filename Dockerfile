FROM nginx:1.17
#COPY nginx.conf /etc/nginx
COPY ./dist /usr/share/nginx/html

EXPOSE 80
#FROM node:13.13.0-alpine3.10
#
## 1.1 先安装依赖
#WORKDIR /app
#
#COPY . /app/
#
##RUN yarn install
#RUN yarn install --har
#
#EXPOSE 8080
#
#CMD yarn serve
