# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Tell Cloud Run to use PORT env variable (not hardcoded)
EXPOSE 8080
ENV PORT=8080

# Replace the default Nginx config with one that listens on $PORT
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen ${PORT};
  server_name localhost;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files \$uri /index.html;
  }
}
EOF

CMD ["nginx", "-g", "daemon off;"]
