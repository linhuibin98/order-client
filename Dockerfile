FROM nginx
LABEL name="order"
LABEL version="1.0"
COPY ./build /usr/share/nginx/html/order-client
COPY ./dist /usr/share/nginx/html/order-cms
COPY ./docs /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80