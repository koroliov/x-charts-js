.PHONY: help \
	help-list-cmd-options \
	podman-image-build \
	podman-container-run-interactive \
	podman-container-run-detached \
	podman-container-run-attached \
	podman-container-logs \
	podman-container-kill \
	podman-container-restart \
	podman-container-bash \
	podman-container-copy-from \
	podman-container-copy-to \
	flow-build
.SILENT: help \
	help-list-cmd-options

FILE := ''
PROJECT_NAME := x-charts
PROJECT_IMAGE_TAG := 13
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
	echo "    podman-container-copy-from"
	echo "    podman-container-copy-to"
	echo "  example: make FILE=foo/bar.js podman-container-copy-to"

podman-image-build:
	podman build . \
	--build-arg FEDORA_VERSION_NUM=$(FEDORA_VERSION_NUM) \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	--build-arg PROJECT_IMAGE_TAG=$(PROJECT_IMAGE_TAG) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

podman-container-run-interactive: podman-container-run-detached \
 podman-container-bash

podman-container-run-detached:
	podman container run --rm \
	--publish 8080:443 \
	-v $(PWD)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v $(PWD)/package-lock.json:/home/$(PROJECT_NAME)/package-lock.json \
	-v $(PWD)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(PWD)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(PWD)/test/:/home/$(PROJECT_NAME)/test/ \
	-d --name $(CONTAINER_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

podman-container-run-attached:
	podman container run --rm \
	--publish 8080:443 \
	-v $(PWD)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v $(PWD)/package-lock.json:/home/$(PROJECT_NAME)/package-lock.json \
	-v $(PWD)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(PWD)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(PWD)/test/:/home/$(PROJECT_NAME)/test/ \
	--name $(CONTAINER_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

podman-container-restart:
	podman container restart $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

podman-container-logs:
	podman container logs -f $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

podman-container-kill:
	podman container kill $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

podman-container-bash:
	podman container exec -it $(CONTAINER_NAME) bash

podman-container-copy-from:
	podman container cp $(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE) \
	$(FILE)

podman-container-copy-to:
	podman container cp $(FILE) \
	$(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE)

flow-build:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm run flow-build"
