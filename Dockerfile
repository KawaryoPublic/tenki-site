#Run following 2 commands to build an image
# export PATH=/Users/221315kwr/.docker/bin:$PATH
# docker-compose up --build

FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma db push --accept-data-loss

CMD [ "npm", "run", "dev" ]