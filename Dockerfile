FROM nginx:1.17
RUN rm -rf /home/html/*
COPY ./dist/ /home/html/
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
