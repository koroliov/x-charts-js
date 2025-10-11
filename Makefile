FILE := ''
PROJECT_NAME := x-charts-js
PROJECT_IMAGE_TAG := 4
CONTAINER_NAME := $(PROJECT_NAME)-$(PROJECT_IMAGE_TAG)
NODE_VERSION_NUM := 24.8.0
NPM_VERSION_NUM := 11.6.1
FEDORA_VERSION_NUM := 42

SHELL := /bin/bash
.SHELLFLAGS := -xeuo pipefail -c

include ./var/Makefile.config

.DEFAULT:
	@echo "Something went wrong, check $@ file/target is present"
	@exit 1

.PHONY: help
help:
	@echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

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
	--publish $(DOCUSAURUS_PORT):3000 \
	--publish $(LIVERELOAD_PORT):35729 \
	--env LIVERELOAD_PORT=$(LIVERELOAD_PORT) \
	-v $(CURDIR)/var/:/home/$(PROJECT_NAME)/var/ \
	-v $(CURDIR)/dist/:/home/$(PROJECT_NAME)/dist/ \
	-v $(CURDIR)/flow/:/home/$(PROJECT_NAME)/flow/ \
	-v $(CURDIR)/test/:/home/$(PROJECT_NAME)/test/ \
	-v $(CURDIR)/docs/:/home/$(PROJECT_NAME)/docs/ \
	-v $(CURDIR)/docs-src/blog/:/home/$(PROJECT_NAME)/docs-src/blog/ \
	-v $(CURDIR)/docs-src/docs/:/home/$(PROJECT_NAME)/docs-src/docs/ \
	-v $(CURDIR)/docs-src/src/:/home/$(PROJECT_NAME)/docs-src/src/ \
	-v $(CURDIR)/docs-src/static/:/home/$(PROJECT_NAME)/docs-src/static/ \
	-v $(CURDIR)/docs-src/var/:/home/$(PROJECT_NAME)/docs-src/var/ \
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

#npm section
.PHONY: npm-outdated docusaurus-npm-outdated
docusaurus-npm-outdated: WORKDIR = --workdir //home/$(PROJECT_NAME)/docs-src/
npm-outdated docusaurus-npm-outdated:
	podman container exec $(WORKDIR) $(CONTAINER_NAME) bash -c \
	'npm outdated; err_code=$$?; [ $$err_code -eq 1 ] && exit 0 || \
	exit $$err_code'

.PHONY: npm-install-save-dev-help
npm-install-save-dev-help:
	@echo "make npm-install-save-dev NPM_MOD='nodemon@3.1.10'"

.PHONY: npm-install-save-dev docusaurus-npm-install-save-dev
docusaurus-npm-install-save-dev: WORKDIR = --workdir \
 //home/$(PROJECT_NAME)/docs-src/
npm-install-save-dev docusaurus-npm-install-save-dev:
	podman container exec $(WORKDIR) $(CONTAINER_NAME) bash -c "npm i --save-dev \
	$(NPM_MOD) && cp package.json ./var/ && cp package-lock.json ./var/ && \
	echo 'DON''T FORGET TO REBUILD IMAGE'"

#docs section
.PHONY: docusaurus-build
docusaurus-build:
	podman container exec --workdir //home/$(PROJECT_NAME)/docs-src/ \
	$(CONTAINER_NAME) \
	bash -c "npm run build && rm -rf ../docs/* ../docs/.[!.]* ../docs/..?* && \
	cp -r ../docs-tmp/* ../docs/ && \
	cp -r ../docs-tmp/.[!.]* ../docs/"

.PHONY: docusaurus-npm-install-save-dev-help
docusaurus-npm-install-save-dev-help:
	@echo "make docusaurus-npm-install-save-dev-help NPM_MOD='nodemon@3.1.10'"

.PHONY: zip-dist-for-release
zip-dist-for-release: TMPDIR = /tmp/zip-dist-for-release
zip-dist-for-release:
	podman container exec $(CONTAINER_NAME) \
	bash -c "rm -rf $(TMPDIR) && \
	mkdir $(TMPDIR) && \
	mv ./dist/modules $(TMPDIR)/$(PROJECT_NAME) && \
	cd $(TMPDIR) && \
	zip -9r /home/$(PROJECT_NAME)/dist/$(PROJECT_NAME).zip $(PROJECT_NAME)"

#flow section
.PHONY: flow-build-full
flow-build-full:
	podman container exec -it $(CONTAINER_NAME) bash -c "npm run flow-build-full"

#test section
.PHONY: test-unit
test-unit: TEST_FILES_RUN = $(subst ./flow/,./test/unit-tmp/flow/,$(TEST_FILES))
test-unit:
	podman container exec -it $(CONTAINER_NAME) bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test $(BUILD_FILES) \
	$(TEST_FILES) && npm run tape $(TEST_FILES_RUN)"

.PHONY: test-unit-help
test-unit-help:
	@echo 'make test-unit BUILD_FILES="./flow/src/foo.js ./flow/src/bar/**" \<CR>'
	@echo '  TEST_FILES="./flow/test-unit/foo-1.test.js '
	@echo '    ./flow/test-unit/foo-2.test.js"'

.PHONY: test-unit-full
test-unit-full:
	podman container exec -it $(CONTAINER_NAME) bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test \
	./flow/ && npm run tape ./test/unit-tmp/\{**/,\}*.test.js"

ifneq ($(wildcard ./Makefile.current), '')
  include ./var/Makefile.current
endif
