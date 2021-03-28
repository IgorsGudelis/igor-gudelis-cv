# base image
FROM node:14.16.0 as build-stage

# install dependencies
RUN apt-get update && apt-get install rsync -y

# set the path
ENV APP_ROOT /usr/src/app

# set working directory
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH $APP_ROOT/node_modules/.bin:$PATH

COPY package*.json $APP_ROOT/

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@latest

# add app
COPY . $APP_ROOT

# run tests
# RUN yarn test --browsers ChromeHeadless --watch=false

# build app
RUN npm run build --output-path=$APP_ROOT/dist

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.8-alpine

COPY --from=build-stage /usr/src/app/dist/gudigors-cv/ /usr/share/nginx/html

# Copy the default nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]