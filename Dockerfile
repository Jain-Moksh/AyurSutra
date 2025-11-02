# ===== Build Stage =====
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ===== Production Stage =====
FROM nginx:alpine

# Copy built React app to Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Cloud Run expects
EXPOSE 8080
ENV PORT=8080

# Make Nginx listen on Cloud Run's dynamic $PORT
RUN sed -i "s/listen       80;/listen       ${PORT};/" /etc/nginx/conf.d/default.conf

# Optional: ensure single-page app routes work correctly
RUN sed -i '/location \/ {/a \\ttry_files $uri /index.html;' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

