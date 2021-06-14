FROM node:14

# If package.json different from cache, install
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install

# Move node modules to /opt/app
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

RUN cd /

COPY . .

EXPOSE 9000

CMD ["node", "app.js"]