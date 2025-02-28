.SILENT: help \
	help-list-cmd-options

FILE := ''
PROJECT_NAME := x-charts
PROJECT_IMAGE_TAG := 17
CONTAINER_NAME := $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)
NODE_VERSION_NUM := 23.6.0
NPM_VERSION_NUM := 11.1.0
FEDORA_VERSION_NUM := 41

.DEFAULT:
	@echo "Unknown target $@"

.PHONY: help
help:
	echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

.PHONY: help-list-cmd-options
help-list-cmd-options:
	echo "FILE: file path + name in the project on the host and on the container"
	echo "  no preceding slash, like ./"
	echo "  Used with:"
	echo "    podman-container-copy-from"
	echo "    podman-container-copy-to"
	echo "  example: make FILE=foo/bar.js podman-container-copy-to"

.PHONY: podman-image-build
podman-image-build:
	podman build . \
	--build-arg FEDORA_VERSION_NUM=$(FEDORA_VERSION_NUM) \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg NPM_VERSION_NUM=$(NPM_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	--build-arg PROJECT_IMAGE_TAG=$(PROJECT_IMAGE_TAG) \
	-t $(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-run-interactive
podman-container-run-interactive: podman-container-run-detached \
 podman-container-bash

.PHONY: podman-container-run-detached
podman-container-run-detached:
	podman container run --rm \
	--init \
	--publish 8080:443 \
	--publish 35729:35729 \
	-v $(CURDIR)/cmd.js:/home/$(PROJECT_NAME)/cmd.js \
	-v $(CURDIR)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v $(CURDIR)/package-lock.json:/home/$(PROJECT_NAME)/package-lock.json \
	-v $(CURDIR)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(CURDIR)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(CURDIR)/test/:/home/$(PROJECT_NAME)/test/ \
	-d --name $(CONTAINER_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-run-attached
podman-container-run-attached:
	podman container run --rm \
	--init \
	--publish 8080:443 \
	--publish 35729:35729 \
	-v $(CURDIR)/cmd.js:/home/$(PROJECT_NAME)/cmd.js \
	-v $(CURDIR)/package.json:/home/$(PROJECT_NAME)/package.json \
	-v $(CURDIR)/package-lock.json:/home/$(PROJECT_NAME)/package-lock.json \
	-v $(CURDIR)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(CURDIR)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(CURDIR)/test/:/home/$(PROJECT_NAME)/test/ \
	--name $(CONTAINER_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-restart
podman-container-restart:
	podman container restart $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-logs
podman-container-logs:
	podman container logs -f $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-kill
podman-container-kill:
	podman container kill $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

.PHONY: podman-container-bash
podman-container-bash:
	podman container exec -it $(CONTAINER_NAME) bash

.PHONY: podman-container-copy-from
podman-container-copy-from:
	podman container cp $(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE) \
	$(FILE)

.PHONY: podman-container-copy-to
podman-container-copy-to:
	podman container cp $(FILE) \
	$(CONTAINER_NAME):/home/$(PROJECT_NAME)/$(FILE)

.PHONY: flow-build
flow-build:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm run flow-build"
