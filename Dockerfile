# Run the following command to build an image
# export PATH=/Users/221315kwr/.docker/bin:$PATH && docker-compose up --build

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD npx prisma db push --accept-data-loss && npm run dev