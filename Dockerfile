FROM node:18

WORKDIR /usr/src/freshwar_app

COPY package*.json ./

RUN npm install

COPY . /usr/src/freshwar_app

RUN npm run build

CMD [ "npm", "run", "start:dev" ]


# Dockerfile

FROM node:18

WORKDIR /usr/src/freshwar_app

COPY package*.json ./

RUN npm install

COPY . /usr/src/freshwar_app

ARG NODE_ENV=
ENV NODE_ENV $NODE_ENV

RUN if [ "$NODE_ENV" = "prod" ]; then npm run build; fi

# CMD ["npm", "run", "${NODE_ENV === 'prod' ? 'start' : 'start:dev'}"]
CMD sh -c "if [ \"$NODE_ENV\" = \"prod\" ]; then npm run start; else npm run start:dev; fi"

