FROM node:18.16-alpine as builder
ARG REACT_APP_API_KEY
WORKDIR /app
COPY files_system/package*.json ./
RUN npm install
COPY files_system .
RUN REACT_APP_API_KEY=$REACT_APP_API_KEY npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]