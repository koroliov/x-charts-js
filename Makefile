include ./.env

SHELL := /bin/bash
#.SHELLFLAGS := -xeuo pipefail -c
.SHELLFLAGS := -euo pipefail -c

include ./var/Makefile.config

.DEFAULT:
	@echo "Something went wrong, check $@ file/target is present"
	@exit 1

.PHONY: help
help:
	@echo "Provide a target, type in the command prompt: \
	make <space> <tab> <tab> to see all targets"

.PHONY: podman-image-build-main podman-image-build-docs
podman-image-build-main: TARGET = main
podman-image-build-main: TAG = $(MAIN_IMAGE_TAG)
podman-image-build-main: EXTRA_ARGS = \
 --build-arg VAR_DIR_CONTAINED=$(VAR_DIR_CONTAINED)
podman-image-build-docs: TARGET = docs
podman-image-build-docs: TAG = $(DOCS_IMAGE_TAG)
podman-image-build-main podman-image-build-docs:
	podman build . --target $(TARGET) \
	--build-arg FEDORA_VERSION_NUM=$(FEDORA_VERSION_NUM) \
	--build-arg NODE_VERSION_NUM=$(NODE_VERSION_NUM) \
	--build-arg NPM_VERSION_NUM=$(NPM_VERSION_NUM) \
	--build-arg PROJECT_NAME=$(PROJECT_NAME) \
	$(EXTRA_ARGS) -t $(PROJECT_NAME)-$(TARGET):$(TAG)

.PHONY: podman-image-build-playwright
podman-image-build-playwright: TARGET = playwright
podman-image-build-playwright: TAG = $(PLAYWRIGHT_IMAGE_TAG)
podman-image-build-playwright:
	podman build . --target $(TARGET) \
	--build-arg PLAYWRIGHT_BASE_IMAGE=$(PLAYWRIGHT_BASE_IMAGE) \
	--build-arg NPM_VERSION_NUM=$(NPM_VERSION_NUM) \
	-t $(PROJECT_NAME)-$(TARGET):$(TAG)

#npm section
.PHONY: npm-outdated-main npm-outdated-docs
npm-outdated-docs: WORKDIR = --workdir //home/$(PROJECT_NAME)/docs-src/
npm-outdated-docs: SERVICE = docs
npm-outdated-main: SERVICE = main
npm-outdated-main npm-outdated-docs:
	podman compose exec $(WORKDIR) $(SERVICE) bash -c \
	'npm outdated; err_code=$$?; [ $$err_code -eq 1 ] && exit 0 || \
	exit $$err_code'

.PHONY: npm-install-save-dev-help
npm-install-save-dev-help:
	@echo "make npm-install-save-dev-main/docs NPM_MOD='nodemon@3.1.10'"

.PHONY: npm-install-save-dev-main npm-install-save-dev-docs
npm-install-save-dev-docs: WORKDIR = --workdir //home/$(PROJECT_NAME)/docs-src/
npm-install-save-dev-docs: SERVICE = docs
npm-install-save-dev-main: SERVICE = main
npm-install-save-dev-main npm-install-save-dev-docs:
	podman compose exec $(WORKDIR) $(SERVICE) bash -c "npm i --save-dev \
	$(NPM_MOD) && cp package.json ./var/ && cp package-lock.json ./var/ && \
	echo 'DON''T FORGET TO REBUILD IMAGE'"

#docs section
.PHONY: docusaurus-build
docusaurus-build: TMPDIR = $(VAR_DIR_CONTAINED)/docusaurus-build
docusaurus-build:
	podman compose exec --workdir //home/$(PROJECT_NAME)/ docs \
	bash -c 'node ./docs-src/var/enforce-version-number.js'
	podman compose exec --workdir //home/$(PROJECT_NAME)/docs-src/ docs \
	bash -c 'npm run build && \
  find ../docs -mindepth 1 -prune -exec rm -rf -- "{}" + && \
  find $(TMPDIR) -mindepth 1 -prune -exec cp -r -- "{}" ../docs/ \;'

.PHONY: zip-dist-for-release
zip-dist-for-release: TMPDIR = /tmp/zip-dist-for-release
zip-dist-for-release:
	podman compose exec main \
	bash -c "rm -rf $(TMPDIR) && \
	mkdir $(TMPDIR) && \
	mv ./dist/modules $(TMPDIR)/$(PROJECT_NAME) && \
	cd $(TMPDIR) && \
	zip -9r /home/$(PROJECT_NAME)/dist/$(PROJECT_NAME).zip $(PROJECT_NAME)"

#flow section
.PHONY: flow-build-full
flow-build-full:
	podman compose exec main bash -c "npm run flow-build-full"

#test section
.PHONY: test-unit
test-unit: TEST_FILES_RUN = $(subst ./flow/,./test/unit-tmp/flow/,$(TEST_FILES))
test-unit:
	podman compose exec main bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test $(BUILD_FILES) \
	$(TEST_FILES) && npm run tape $(TEST_FILES_RUN)"

.PHONY: test-unit-help
test-unit-help:
	@echo 'make test-unit BUILD_FILES="./flow/src/foo.js ./flow/src/bar/**" \<CR>'
	@echo '  TEST_FILES="./flow/test-unit/foo-1.test.js '
	@echo '    ./flow/test-unit/foo-2.test.js"'

.PHONY: test-unit-full
test-unit-full:
	podman compose exec main bash -c "rm -rf \
	./test/unit-tmp/* && npm run flow && npm run flow-build-test \
	./flow/ && npm run tape ./test/unit-tmp/\{**/,\}*.test.js"

.PHONY: test-e2e-full
test-e2e-full:
	podman compose exec playwright bash -c "npm run test"

ifneq ($(wildcard ./Makefile.current), '')
  include ./var/Makefile.current
endif
