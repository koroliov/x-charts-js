**Rules for development:**

**Increment image tag number**

If any of:
- package.json
- package-lock.json
- Dockerfile
- Makefile (only in case it affects the docker image/container)

have been changed, the docker image tag must be incremented by 1.

Currently this is handled manually
