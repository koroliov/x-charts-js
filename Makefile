.PHONY: help \
	help-list-cmd-options \
	docker-image-build \
	docker-container-run-interactive \
	docker-container-run-detached \
	docker-container-logs \
	docker-container-kill \
	docker-container-bash \
	docker-container-copy-from \
	docker-container-copy-to \
	flow-build
.SILENT: help \
	help-list-cmd-options

FILE := ''
PROJECT_NAME := x-charts
PROJECT_IMAGE_TAG := 7
CONTAINER_NAME := $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)
NODE_VERSION_NUM := 23.6.0
FEDORA_VERSION_NUM := 41
PWD := $(shell pwd)

help:
	echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

help-list-cmd-options:
	echo "FILE: file path + name in the project on the host and on the container"
	echo "  no preceding slash, like ./"
	echo "  Used with:"
	echo "    docker-container-copy-from"
	echo "    docker-container-copy-to"
	echo "  example: make FILE=foo/bar.js docker-container-copy-to"

docker-image-build:
	docker build . \
	--build-arg FEDORA_VERSION_NUM=$(FEDORA_VERSION_NUM) \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	--build-arg PROJECT_IMAGE_TAG=$(PROJECT_IMAGE_TAG) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-run-interactive: docker-container-run-detached \
 docker-container-bash

docker-container-run-detached:
	docker container run --rm \
	--publish 443:443 \
	-v $(PWD)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v $(PWD)/package-lock.json:/home/$(PROJECT_NAME)/package-lock.json \
	-v $(PWD)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(PWD)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(PWD)/test/:/home/$(PROJECT_NAME)/test/ \
	-d --name $(CONTAINER_NAME) -u $(PROJECT_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-logs:
	docker container logs -f $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

docker-container-kill:
	docker container kill $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

docker-container-bash:
	docker container exec -it $(CONTAINER_NAME) bash

docker-container-copy-from:
	docker container cp $(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE) \
	$(FILE)

docker-container-copy-to:
	docker container cp $(FILE) \
	$(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE)

flow-build:
	docker container exec -it $(CONTAINER_NAME) bash -c "npm run flow-build"
