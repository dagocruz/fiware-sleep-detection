FROM node:carbon

ENV WEB_APP_PORT "3000"
ENV DUMMY_DEVICES_PORT "3001"


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Ports used by cygnus-ngsi
EXPOSE ${WEB_APP_PORT} ${DUMMY_DEVICES_PORT}

CMD ["npm", "start" ]