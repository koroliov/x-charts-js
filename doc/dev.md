**Rules for development:**

**Increment image tag number**

If any of:
- package.json (only in case it affects the podman image/container, i.e. only if
    npm modules were changed)
- package-lock.json
- Containerfile
- Makefile (only in case it affects the podman image/container)

have been changed, the docker image tag must be incremented by 1.

Currently this is handled manually

**How to install/update other software in container?**

- Modify the Dockerfile
- Update the image tag number
- Rebuild image
- Run the container with an interactive shell or login into a running container
  - Check the software version
- Commit the changes

**How to install/update node packages?**

- Run the container with an interactive shell or login into a running container
- Install/update the package
- Update the image tag number
- Commit the changes
- Rebuild the image
