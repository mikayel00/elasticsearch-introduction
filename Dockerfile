FROM node:18.18.0-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
#RUN yarn global add pm2

FROM builder AS runner
WORKDIR /app
EXPOSE 8000
#RUN yarn global add pm2
ENTRYPOINT [ "sh", "-c" ]
CMD [ "yarn migration:run && yarn start:prod"  ]
