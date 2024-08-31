.PHONY: help \
	docker-image-build \
	docker-container-run \
	docker-container-kill
.SILENT: help

PROJECT_NAME := "xcharts"
PROJECT_IMAGE_TAG := "0"
NODE_VERSION_NUM := "22.5.1"

help:
	echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

docker-container-run: docker-image-build
	docker container run --rm \
	--publish 443:443 \
	-v ./package.json:/home/$(PROJECT_NAME)/package.json \
	-v ./dist/:/home/$(PROJECT_NAME)/dist/ \
	-v ./test/:/home/$(PROJECT_NAME)/test/ \
	-d \
	--name $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG) \
	-u $(PROJECT_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-kill:
	docker container kill $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

docker-image-build:
	docker build . \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)
