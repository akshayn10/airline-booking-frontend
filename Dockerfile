FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the remaining application code
COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
