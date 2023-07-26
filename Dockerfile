FROM nginx:1.17
RUN rm -rf /home/html/*
COPY ./dist/ /home/html/
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
CMD [ "/bin/bash","-c","echo \"window.API_BASE_URL = \"$API_BASE_URL\"\" > /home/html/config.js;nginx -g  \"daemon off;\"" ]

