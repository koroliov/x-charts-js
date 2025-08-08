FILE := ''
PROJECT_NAME := x-charts
PROJECT_IMAGE_TAG := 25
CONTAINER_NAME := $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)
NODE_VERSION_NUM := 24.5.0
NPM_VERSION_NUM := 11.5.2
FEDORA_VERSION_NUM := 42

include ./var/Makefile.config

.DEFAULT:
	@echo "Something went wrong, check $@ file/target is present"
	@exit 1

.PHONY: help
help:
	@echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

.PHONY: help-list-cmd-options
help-list-cmd-options:
	@echo "FILE: file path + name in the project on the host and on the container"
	@echo "  no preceding slash, like ./"
	@echo "  Used with:"
	@echo "    podman-container-copy-from"
	@echo "    podman-container-copy-to"
	@echo "  example: make FILE=foo/bar.js podman-container-copy-to"

#podman section
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

.PHONY: podman-container-run-detached .podman-container-run-attached
podman-container-run-attached:
podman-container-run-detached: DETACHED_FLAG = -d
podman-container-run-attached podman-container-run-detached:
	podman container run --rm \
	--init \
	--publish $(PORT):443 \
	--publish $(LIVERELOAD_PORT):35729 \
	--env LIVERELOAD_PORT=$(LIVERELOAD_PORT) \
	-v $(CURDIR)/var/:/home/$(PROJECT_NAME)/var/ \
	-v $(CURDIR)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(CURDIR)/src/:/home/$(PROJECT_NAME)/src/ \
	-v $(CURDIR)/test/:/home/$(PROJECT_NAME)/test/ \
	$(DETACHED_FLAG) --name $(CONTAINER_NAME) \
	$(PROJECT_NAME):$(PROJECT_IMAGE_TAG)
	podman container exec -it $(CONTAINER_NAME) bash -c \
	"[[ -d './test/served-tmp/' ]] || mkdir './test/served-tmp/'"
	podman container exec -it $(CONTAINER_NAME) bash -c \
	"[[ -d './test/diff/' ]] || mkdir './test/diff/'"
	podman container exec -it $(CONTAINER_NAME) bash -c \
	"[[ -d './test/unit-tmp/' ]] || mkdir './test/unit-tmp/'"

.PHONY: podman-container-attach
podman-container-attach:
	podman container attach $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)

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

#npm section
.PHONY: npm-outdated
npm-outdated:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm outdated"

.PHONY: npm-install-save-dev-help
npm-install-save-dev-help:
	@echo "make npm-install NPM_MOD='nodemon@3.1.10'"

.PHONY: npm-install-save-dev
npm-install-save-dev:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm i --save-dev \
	$(NPM_MOD) && cp package.json ./var/ && cp package-lock.json ./var/ && \
	echo 'DON''T FORGET TO REBUILD IMAGE'"

#flow section
.PHONY: flow-build-full
flow-build-full:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm run flow-build-full"

#test section
.PHONY: test-unit
test-unit: TEST_FILES_RUN = $(subst ./src/,./test/unit-tmp/src/,$(TEST_FILES))
test-unit:
	podman container exec -it $(CONTAINER_NAME) bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test $(BUILD_FILES) \
	$(TEST_FILES) && npm run tape $(TEST_FILES_RUN)"

.PHONY: test-unit-help
test-unit-help:
	@echo 'make test-unit BUILD_FILES="./src/foo.js ./src/bar/**" \<CR>'
	@echo '  TEST_FILES="./src/test-unit/foo-1.test.js '
	@echo '    ./src/test-unit/foo-2.test.js"'

.PHONY: test-unit-full
test-unit-full:
	podman container exec -it $(CONTAINER_NAME) bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test \
	./src/ && npm run tape ./test/unit-tmp/\{**/,\}*.test.js"

ifneq ($(wildcard ./Makefile.current), '')
  include ./var/Makefile.current
endif
