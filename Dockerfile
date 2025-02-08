#This is not a typo, 00 is needed
ARG FEDORA_VERSION_NUM=00

FROM fedora:${FEDORA_VERSION_NUM}

ARG PROJECT_NAME=${PROJECT_NAME}
ARG PROJECT_IMAGE_TAG=${PROJECT_IMAGE_TAG}
ARG NODE_VERSION_NUM
ARG NODE_DIR_NAME=node-v${NODE_VERSION_NUM}-linux-x64
ARG NODE_TARBALL_NAME=${NODE_DIR_NAME}.tar.xz
ENV PATH=/opt/${NODE_DIR_NAME}/bin:$PATH

LABEL name=${PROJECT_NAME}-${PROJECT_IMAGE_TAG}
LABEL maintainer=${PROJECT_NAME}

WORKDIR /opt

RUN echo "${PROJECT_NAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${PROJECT_NAME}
RUN dnf install -y procps-ng-4.0.4-4.fc41.x86_64
RUN curl -s https://nodejs.org/dist/v${NODE_VERSION_NUM}/${NODE_TARBALL_NAME} > \
  ${NODE_TARBALL_NAME}
RUN tar -xf ${NODE_DIR_NAME}.tar.xz
RUN rm ${NODE_DIR_NAME}.tar.xz

RUN adduser --uid 1000 ${PROJECT_NAME}
USER ${PROJECT_NAME}

WORKDIR /home/${PROJECT_NAME}

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

CMD ["npm", "run", "nodemon", "--legacy-watch", "./test/e2e/utils/server/main.js"]
