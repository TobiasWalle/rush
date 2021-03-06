FROM yarnpkg/node-yarn:node7

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependecies
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install --pure-lockfile

# Copy other files
COPY . /usr/src/app/

# Build
RUN yarn run build:server:prod
RUN yarn run build:client:prod


# Install pm2
RUN yarn global add pm2

# Start server
EXPOSE 3000
CMD ["pm2-docker", "start", "./dist/server/server.js"]

