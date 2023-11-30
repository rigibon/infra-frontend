FROM node:18.13-alpine AS build
WORKDIR /usr/src/app
ADD https://raw.githubusercontent.com/rigibon/angular-project/main/package.json package.json
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]