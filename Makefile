.PHONY: help \
	docker-image-build \
	docker-container-run
.SILENT: help

PROJECT_NAME := "x-charts"
PROJECT_IMAGE_TAG := "0"
NODE_VERSION_NUM := "22.5.1"

help:
	echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

docker-image-build:
	docker build . \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

docker-container-run:
	docker container run --rm -u $(PROJECT_NAME) \
	-it $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)
