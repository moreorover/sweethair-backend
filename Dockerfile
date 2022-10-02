FROM node:16-alpine AS base
WORKDIR /usr/src/app
RUN apk update \ 
  && apk add bash \
  && rm -rf /var/cache/apk/*
COPY . . 
RUN npm ci
RUN npx prisma generate