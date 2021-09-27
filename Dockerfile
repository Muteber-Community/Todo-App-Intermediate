FROM node
WORKDIR /opt/node-app
COPY . .
RUN npm install
CMD npm run dev