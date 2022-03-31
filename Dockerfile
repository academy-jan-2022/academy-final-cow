# 1st step: The build

# Here we state that we will be using the node 16.10 version as the base image
FROM node:17.6-alpine
# We define /app as our working directory -where our incoming commands will be executed-
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# We copy our package.json and yarn.lock (adapt if you are using npm to package-lock.json) into our workdir
COPY package.json ./
COPY package-lock.json ./
# We install our dependencies
RUN npm install --silent
# We install react-scripts globally to avoid any bad surprise
RUN npm install -g react-scripts@5.0.0 --silent

# COPY our app
COPY . ./

# start app
CMD ["npm", "start"]