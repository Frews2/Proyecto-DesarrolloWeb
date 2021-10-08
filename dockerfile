FROM node:14
WORKDIR /node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available ([email protected]+)
COPY package*.json ./

RUN npm install
RUN npm install mongoose --save
RUN npm install jsonwebtoken --save
RUN npm install bcrypt --save
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "server.js" ]