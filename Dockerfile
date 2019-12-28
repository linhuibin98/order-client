FROM nginx
LABEL name="order-client"
LABEL version="1.0"
COPY  ./build/ /usr/share/nginx/html/
COPY /usr/projects/config/order-client.conf /etc/nginx/conf.d/
EXPOSE 80