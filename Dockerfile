FROM node:16 as base

WORKDIR /usr/game_service/
COPY package.json \
    ./
RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# lint and formatting configs are commented out
# uncomment if you want to add them into the build process

FROM base AS dev
COPY nest-cli.json \
    tsconfig.* \ 
    ormconfig.* \ 
    *env \
    .eslintrc.js \
    .prettierrc \
    ./
ENV NODE_ENV=development
# bring in src from context
COPY ./src/ ./src
RUN yarn
RUN yarn lint
RUN yarn build

# use one of the smallest images possible
FROM node:16-alpine as production
# get package.json from base
COPY --from=base /usr/game_service/ ./
# get the dist back
COPY --from=dev /usr/game_service/dist/ ./dist/
COPY --from=dev /usr/game_service/.env ./.env
ENV NODE_ENV=production
# get the node_modules from the intial cache
COPY --from=base /usr/game_service/node_modules/ ./node_modules/

# expose application port 
EXPOSE 8080

# start
CMD node  --max-http-header-size 50000 dist/main.js 
