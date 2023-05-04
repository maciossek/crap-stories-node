FROM node:lts
LABEL maintainer "mathias.maciossek@gmail.com"
LABEL org.opencontainers.image.source="https://github.com/maciossek/crap-stories-node"

WORKDIR /usr/app  

ENV NODE_ENV=development
ENV PORT=3001
ENV LOG_LEVEL=debug
ENV CORS_URLS=http://example.com
ENV DB_HOST=postgresql://hft:hft@localhost:5432/hft
ENV PGSSLMODE=disable
ENV JWKS_URI=https://maciossek-hft.eu.auth0.com/.well-known/jwks.json


RUN npm install -f @swc/core-linux-arm64-gnu

COPY . /usr/app

ENTRYPOINT ["npm", "run", "start"]
