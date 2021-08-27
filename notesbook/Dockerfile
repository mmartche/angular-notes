FROM node:16.3
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install -g @angular/cli
RUN npm config set strict-ssl false && \
    npm install --silent && \
    npm run build
FROM nginx:1.21.0
EXPOSE 80
COPY --from=0 /usr/src/app/dist/front-app-ovd /usr/share/nginx/html
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
