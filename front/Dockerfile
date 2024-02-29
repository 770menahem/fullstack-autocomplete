FROM node:20-alpine3.18

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY docker.environment.ts /usr/src/app/src/environments/environment.development.ts
RUN npm install -g @angular/cli

RUN npm install

RUN ng build --configuration production


CMD ["ng", "serve", "--host", "0.0.0.0"]