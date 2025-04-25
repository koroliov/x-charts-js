**Rules for development:**

============================= **Various** ======================================

**Increment image tag number**

If any of:
- package.json (only in case it affects the podman image/container, i.e. only if
    npm modules were changed)
- package-lock.json
- Containerfile
- Makefile (only in case it affects the podman image/container)

have been changed, the podman image tag must be incremented by 1.

Currently this is handled manually

**How to install/update other software in container?**

- Modify the Containerfile
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

**How to modify/work with test/server/main.js w/o restarting container?**

Since it may be incovenient to work with the server's main.js file, b/c in case
of an error the developer will have to restart the container, here is a way to
temporary enable 'the watch mode':

- Kill the podman container
- Comment/Uncomment the CMD instruction in the Containerfile to use nodemon
- Rebuild the image (no need to update the tag)
- Run the container with the *attached Makefile target
  `$ make [appropriate target name]` (didn't mention the target name here to
  have less places to do a rename, if one is needed)
- Work with the tesst/server/main.js file
- When everything is ready, kill the container, restore the Containerfile,
  rebuild the image

============================= **Code style** ===================================

**Flow/JavaScript**

- Try to follow [Google JS style guide](https://google.github.io/styleguide/jsguide.html)
- Additional rules:
  - No semicolon after type declarations:
  - Inside type declarations use comas:
  ```
  type foo = [0]
  type bar = 0
  type baz = {
    +propA: number,
    +propB: string,
  }
  ```
