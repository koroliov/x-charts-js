FROM "fedora:40" AS get-node
WORKDIR /tmp
ARG NODE_VERSION_NUM
ARG NODE_DIR_NAME=node-v${NODE_VERSION_NUM}-linux-x64
ARG NODE_TARBALL_NAME=${NODE_DIR_NAME}.tar.xz

RUN curl -s https://nodejs.org/dist/v${NODE_VERSION_NUM}/${NODE_TARBALL_NAME} > \
  ${NODE_TARBALL_NAME}
RUN tar -xf ${NODE_DIR_NAME}.tar.xz

FROM "fedora:40" AS final
ARG NODE_VERSION_NUM
ARG NODE_DIR_NAME=node-v${NODE_VERSION_NUM}-linux-x64
ENV PATH=/opt/${NODE_DIR_NAME}/bin:$PATH
COPY --from=get-node /tmp/${NODE_DIR_NAME} /opt/${NODE_DIR_NAME}

ARG PROJECT_NAME=${PROJECT_NAME}
LABEL name=${PROJECT_NAME}
RUN adduser --uid 1000 ${PROJECT_NAME}
USER ${PROJECT_NAME}
WORKDIR /home/${PROJECT_NAME}

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

CMD ["node", "./test/e2e/utils/server/main.js"]
