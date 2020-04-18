FROM nginx:1.17
#COPY nginx.conf /etc/nginx
COPY ./dist /usr/share/nginx/html

EXPOSE 80
