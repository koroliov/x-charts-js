# Setup local development environment

Contributions are welcome and significant effort has been put into creating a
dev environment with tests, servers etc. set up and which would allow a new
developer to have it running quickly with as little hustle as possible.

I.e. the intention was to allow a new developer to work on the actual library
code, w/o dealing with errors in or setting up tests, for instance.

The dev environment is regularly checked on a Windows x86_64 machine *(with Git
for Windows/x64)*, on Mac it's not been tested, yet should work.

The Arm processors have not been tried, so potentially there could be problems.
If someone provides a solution for such a potential problem, I'd appreciate it.

## Requirements

One will need 3 tools in order to run the dev environment:

- Git
- GNU Make
- Podman

## Setup steps

- Clone this repository
- Copy files:
  - var/Makefile.config.example -> var/Makefile.config
  - var/Makefile.current.example -> var/Makefile.current
- Build the image:
  `make podman-image-build`
- Run the container:
  `make podman-container-run-detached`
- Open the https://localhost:8080/
  You should see a web page with a list of links which you can follow.
- Run the tests:
  `make test-unit-full`

### Editor and LSP setup

Also I'd recommend to set up your text editor with the Facebook flow LSP: i.e.
install (probably globally) corresponding nodejs modules:

- flow-bin@0.259.1
- flow-remove-types@2.259.1

*Don't install newer versions, b/c currently those exact versions are used in
the podman container, so in order not to have some hard to debug differences,
better to use the same versions on the host machine (for autocompletion etc.)
and in the container (for the actual JS code builds).*

And setup your editor to use those modules (i.e. run the LSP server, show
autocompletion popups etc.).

To check if it works, open any src Flow file, e.g. `./flow/src/main.js` and see
if you have the correct syntax highlight, autocompletion.



================================================================================

Now you should be able to make changes to the source code, run tests, make
builds and use the new code on test pages to see the result.
