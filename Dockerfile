FROM ubuntu:20.04

# Install prerequisites for building and running MOOS-IvP.
# Install Node 16
# Run this all in a single layer and delete the apt cache after
RUN apt-get update \
    && apt-get -y install curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_12.x  | bash - \
    && apt-get update \
    && apt-get -y install nodejs \
    && apt-get install -y cmake \
    && apt-get install -y g++ \
    && apt-get install -y subversion \
    && apt-get install -y netbase \
    && apt-get install -y wget \
    && apt-get install -y unzip \
    && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set up pm2 process manager.
RUN npm install pm2 pm2-logrotate -g \
    && pm2 set pm2-logrotate:retain 5 \
    && pm2 set pm2-logrotate:max_size 50M

WORKDIR /app
COPY ./config ./config
COPY ./examples ./examples
COPY ./plugins ./plugins
COPY ./routes ./routes
COPY ./scripts ./scripts
COPY ./services ./services
COPY ./index.js .
COPY ./package.json .

# Install package dependencies and transpile the app.
RUN npm install

ENV NODE_ENV='development'
EXPOSE 3030

ENTRYPOINT ["npm", "start"]