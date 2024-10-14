.PHONY: help \
	list-cmd-options \
	docker-image-build \
	docker-container-run \
	docker-container-kill \
	docker-container-bash \
	docker-container-copy-from \
	docker-container-copy-to
.SILENT: help \
	list-cmd-options

F := ''
PROJECT_NAME := "xcharts"
PROJECT_IMAGE_TAG := "0"
NODE_VERSION_NUM := "22.5.1"
PWD := $(shell pwd)

help:
	echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

list-cmd-options:
	echo "F: file path + name in the project on host and on container"
	echo "  Used with:"
	echo "    docker-container-copy-from"
	echo "    docker-container-copy-to"
	echo "  example: make F=./foo/bar.js docker-container-copy-to"

docker-image-build:
	docker build . \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-run:
	docker container run --rm \
	--publish 443:443 \
	-v /$(PWD)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v /$(PWD)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v /$(PWD)/test/:/home/$(PROJECT_NAME)/test/ \
	-d \
	--name $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG) \
	-u $(PROJECT_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-kill:
	docker container kill $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

docker-container-bash:
	docker container exec -it $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG) bash

docker-container-copy-from:
	docker container cp \
	$(PROJECT_NAME)-$(PROJECT_IMAGE_TAG):/home/$(PROJECT_NAME)/$(F) $(F)

docker-container-copy-to:
	docker container cp \
	$(F) $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG):/home/$(PROJECT_NAME)/$(F)
