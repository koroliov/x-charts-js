**Rules for development:**

============================= **Git** ==========================================

**Branching and merging**

- Logically separate units of work, *unless it's 1 single commit*, should be
  done in a dedicated branch and merged with --no-ff. The purpose of this is
  that it should be more convenient to view history.

- no specific restrictions on where (from which commit) to create a branch.
  Whatever is convenient, e.g. will produce as little conflicts as possible, or
  will provide some benefit by implementing something and merging somewhere as
  soon as possible.

  For example: if there is a branch implement-external-values-processor and one
  needs a change to the local podman compose envirionment, then the dedicated
  branch, (e.g. fix-local-dev-env-issue-with-node-modules-dir-in-mounted-paths)
  should be created from the tip of the implement-external-values-processor
  branch and merged only to it.

  If there is a need to do some SEO task for the documentation, which must be
  available ASAP on the public docs page, then it makes sense to do create a
  do-seo-task branch from the tip of the main branch and merge it to main and to
  some other current branch, to avoid later conflicts on its own merge to main.

- Theoretically there may be problems with the container versions etc. E.g. the
  developer worked on a feature in a branch, updated the container etc. Then
  switched to another branch and forgot to rebuild the image. This can lead to
  problems, but it's not a priority to deal with it now.

  Only commits in the main branch which are marked for a Github release are
  expected to be 100% tested, checked etc.

============================= **Podman** =======================================

**Image tag numbers**

Podman images will be tagged with a number, no branch names etc. Locally the
developer is free to use anything to tag any image, but in the repository it
must always be a number.

In case of changes in:

- package.json (any change)
- package-lock.json (any change)
- Containerfile (any change)
- Makefile (only in case it affects the Podman image/container)

the Podman image tag must be incremented by 1:

- currently this is handled manually.
- it's okay to do it in another commit later (in the same branch)
- merge conflicts are expected, will be handled manually

============================= **Code style** ===================================

**Flow/JavaScript**

- Try to follow [Google TS Style Guide](https://google.github.io/styleguide/tsguide.html)
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
- Every error suppression must have a clear, logical explanation right above it.
  Except for:
  //$FlowFixMe[cannot-resolve-module]
  when importing an external module, where it seems to be obvious.

**Other**

- hex colors (and other colors, but currently only hex colors are supposed to
  be allowed) must always have their human name right next to them, e.g.:
```
{
  value: 50,
  options: {
    color: '#f2b5f6' /* pinkish */,
  },
},
```

  unless those colors are 'closely related' in their tint, e.g. darker, lighter.
```
{
  value: 50,
  options: {
    color: '#f2b5f6' /* pinkish */,
    color: '#c187c5',
  },
},
```

============================= **Various how-tos** ==============================

**How to install/update other software in container?**

- Modify the Containerfile
- Update the image tag number
- Rebuild image
- Run the container with an interactive shell or login into a running container
  - Check the software version
- Commit the changes

**How to install/update node packages?**

- Use Makefile targets like (this is needed to update the package.json,
  package-lock.json files):
  - npm-install-save-dev
  - npm-install-save-dev-help
- Update the image tag number
- Rebuild the image
- Git-commit the changes

**How to modify/work with test/server/main.js w/o restarting container?**

Since it may be incovenient to work with the server's main.js file, b/c in case
of an error the developer will have to restart the container, here is a way to
temporary enable 'the watch mode':

- Kill the Podman container
- Comment/Uncomment the CMD instruction in the Containerfile to use nodemon
- Rebuild the image (no need to update the tag)
- Run the container with the *attached Makefile target
  `$ make [appropriate target name]` (didn't mention the target name here to
  have less places to do a rename, if one is needed)
- Work with the tesst/server/main.js file
- When everything is ready, kill the container, restore the Containerfile,
  rebuild the image

**How to modify script in package.json?**
- modify the package.json file first in an interactive container session.
- once it works, update the main package.json file and rebuild the image
  (increase the tag number)
