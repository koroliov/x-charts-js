#This is not a typo, 00 is needed
ARG FEDORA_VERSION_NUM=00
ARG PLAYWRIGHT_BASE_IMAGE=${PLAYWRIGHT_BASE_IMAGE}

FROM fedora:${FEDORA_VERSION_NUM} as base

ARG PROJECT_NAME=${PROJECT_NAME}
ARG NODE_VERSION_NUM
ARG NPM_VERSION_NUM
ARG NODE_DIR_NAME=node-v${NODE_VERSION_NUM}-linux-x64
ARG NODE_TARBALL_NAME=${NODE_DIR_NAME}.tar.xz
ARG VAR_DIR_CONTAINED=${VAR_DIR_CONTAINED}

ENV PATH=/opt/${NODE_DIR_NAME}/bin:$PATH

WORKDIR /opt
RUN microdnf install -y libatomic
ADD https://nodejs.org/dist/v${NODE_VERSION_NUM}/${NODE_TARBALL_NAME} ${NODE_TARBALL_NAME}
RUN tar -xf ${NODE_DIR_NAME}.tar.xz
RUN rm ${NODE_DIR_NAME}.tar.xz
RUN npm install -g npm@${NPM_VERSION_NUM}
RUN mv /usr/bin/dmesg /usr/bin/dmesg.real && \
  printf '#!/bin/sh\necho "dmesg disabled in this container"\nexit 0\n' > /usr/bin/dmesg && \
  chmod 755 /usr/bin/dmesg

#main image
FROM base as main
ARG PROJECT_NAME
ARG VAR_DIR_CONTAINED

RUN microdnf install -y zip
RUN microdnf install -y ncurses
RUN microdnf install -y openssl

WORKDIR ${VAR_DIR_CONTAINED}/certs
RUN openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
  -subj "/C=GB/ST=London/L=London/O=Global Security/OU=R&D Department/CN=example.com" \
  -keyout privkey.pem  -out cert.pem

WORKDIR /home/${PROJECT_NAME}
COPY ./var/package.json .
COPY ./var/package-lock.json .
RUN npm ci
#CMD ["npm", "run", "nodemon"]
CMD ["node", "./var/cmd.js"]

#docs image
FROM base as docs
ARG PROJECT_NAME

WORKDIR /home/${PROJECT_NAME}/docs-src
COPY ./docs-src/var/package.json .
COPY ./docs-src/var/package-lock.json .
RUN npm ci

CMD ["npm", "run", "serve"]

#playwright image
FROM ${PLAYWRIGHT_BASE_IMAGE} as playwright
ARG NPM_VERSION_NUM

USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
  vim-tiny ca-certificates
RUN npm install -g npm@${NPM_VERSION_NUM}

USER 1001
WORKDIR /home/pwuser

COPY ./test/e2e/playwright/var/package.json .
COPY ./test/e2e/playwright/var/package-lock.json .
RUN npm ci
