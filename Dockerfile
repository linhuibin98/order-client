FROM nginx
LABEL name="order-client"
LABEL version="1.0"
COPY ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80