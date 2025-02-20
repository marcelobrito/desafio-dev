FROM node:latest AS build

WORKDIR /app

COPY ./frontend .

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]