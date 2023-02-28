---
layout: post
title: Rapid Local Development with Vagrant, Docker and Node.js
category: Programming
tags:
  - JavaScript
  - Conventions
  - Docker
  - Vagrant
  - Node.js
---

### TLDR

* Using a cascade of Vagrant shared directories, Docker volumes and cleverly placed symlinks, you can rig Vagrant and Docker to instantly reflect your local application code updates.
* Docker volume -> Vagrant shared directory -> Host machine code.
* Enable NPM link style development in Docker container.
* Dosen't cover `gulp` `webpack` asset generation but you can figure it out.
* There might be a better way to do this or improvements to make. Leave it in the comments.


## The Problem

I wanted to use [isomorphic WebRTC](https://github.com/js-platform/node-webrtc) with the awesome [SimplePeer](https://github.com/feross/simple-peer) in a recent Node.js project. However the server WebRTC has a bunch of system level dependencies that are a pain to install. Luckily they provide a [Dockerfile](https://github.com/js-platform/node-webrtc/blob/develop/Dockerfile) which does it all for you. I didn't end up using their exact Dockerfile but copy pasted the majority of it to my project to use as a `Base web` Dockerfile.

I also wanted to do development on a custom Node module. Usually on your local machine you would do `npm link` which creates a symlink to your module's code directory and you can rapidly iterate there. However, working with Vagrant and Docker makes this more complicated.

I wanted all this to work without having to rebuild Docker images, rerun docker containers, or reprovision Vagrant.

## The Base Web Image

``` docker
# baseweb Dockerfile
FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive
RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections

RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:webupd8team/java && add-apt-repository ppa:chris-lea/node.js && apt-get update

RUN apt-get install -y git subversion g++ python libnss3-dev libasound2-dev libpulse-dev \
libjpeg62-dev libxv-dev libgtk2.0-dev libexpat1-dev libxss-dev libudev-dev libdrm-dev libgconf2-dev \
libgcrypt11-dev libpci-dev libxtst-dev libgnome-keyring-dev libssl-dev nodejs oracle-java6-installer oracle-java6-set-default

ENV JAVA_HOME /usr/lib/jvm/java-6-oracle/
ENV PATH $PATH:/usr/lib/jvm/java-6-oracle/jre/bin/


RUN npm install -g forever
```

With the `BaseWeb` Dockerfile inplace I then have my Nodejs application. It's structured as follows.

## The Web Application Code
``` bash
/Projects/demo/web
├── Dockerfile
├── index.js
├── node_modules -> /dist/node_modules/
└── package.json
```

Take note here that my `node_modules` is actually a symlink to `/dist/node_modules/` this is committed to my repo. This may seem odd but it's key to letting us rapidly develop on a custom module. It enables a `npm link` style work flow.


### The Vagrant Setup

Assume we have a Vagrantfile outside of our web project like so:

``` bash
/Projects/demo/
├── Vagrantfile
└── web
```

This will automatically mount the web code as a shared directory inside the Vagrant machine at `/vagrant/web`. At this point we can `vagrant up` and edit the application code on the host machine as usual and Vagrant will pickup the changes. This dosen't help us yet because the code is dependent on the ismorphic WebRTC dependences. We need Vagrant to run the Docker containers.

Before we get to the `Vagrantfile` let's look at the Web Applications' Dockerfile.

## The Web Application Dockerfile
``` dockerfile
# web DockerFile
FROM base_web
COPY package.json /dist/package.json
RUN mkdir /dist/node_modules && cd /dist && npm install
ADD . /srv/www
RUN ln -s /dist/node_modules /srv/www/node_modules
WORKDIR /srv/www
EXPOSE 5000
CMD ["forever", "index.js"]
```

#### Points Of Interest

* The key to this whole thing here is the `node_modules` setup. We don't do the `npm install` in the application code directory. We create a `/dist/` directory and copy `package.json` there. We then `npm install` in `/dist` and get `/dist/node_modules`. This is really the seceret sauce. In production you don’t rebuild your modules each time you re-build your container. If your `package.json` file changes then your modules will be rebuilt. I got this from  [Building Efficient Dockerfiles](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)

* `RUN ln -s /dist/node_modules /srv/www/node_modules`

   This creates a symlink for `node_modues` from our application code at `/srv/www`. to our `/dist`. This also overrides the symlink that is committed in the web repo. You might be thinking, "well what was the point of that then?". I promise we'll get to that soon. It's key to the `npm link` style.


### The Vagrant File
``` ruby
Vagrant.configure(2) do |config|
  config.vm.box = "Ubuntu 14.04 with Docker enabled"
  config.vm.box_url = "https://github.com/jose-lpa/packer-ubuntu_14.04/releases/download/v2.0/ubuntu-14.04.box"

  config.vm.provision "docker" do |d|
    d.build_image "/vagrant/Dockerfiles/base_web", args: '-t "base_web"'
    d.build_image "/vagrant/web", args: '-t "web"'

    d.run "web",
          cmd: "forever -w bin/server.js",
          args: "-v '/vagrant/web:/srv/www'\
                 -e NODE_ENV=development\
                 -p 5000:5000"
  end

  config.vm.network "forwarded_port", guest: 5000, host: 5000
end
```

#### Points of interest
* We use a 'Docker enabled' image for our Docker box.
* We use Vagrant's built-in Docker provisioner.
* We then run our container with some new arguments.

Let's look at the run command more in-depth.
``` ruby
    d.run "web",
          cmd: "forever -w index.js",
          args: "-v '/vagrant/web:/srv/www'\
                 -e NODE_ENV=development\
                 -p 5000:5000"

```

We're overriding the Dockerfiles' `CMD ["forever", "index.js"]` with `forever -w index.js` The `-w` flag restarts our server on code updates, which is what we want in a development environment.

### Bringing It All Together
The Most important part of the `docker run` options is the `-v` flag, which is for Docker Volumes. We are telling our container to mount `/srv/www` as a volume that points to `/vagrant/web/`. If you review our Vagrant setup from earlier you can see that `/srv/www` is actualy a shared directory to our application code directory `/web` on the host machine!

A quick diagram of this shared filesystem cascade looks like this:

``` bash
Docker `/srv/www` ->
Vagrant `/vagrant/web ->
Host `/web`/
```


At this point you're set up to rapidly develop on your application code and have updates reflected in your Docker container.

The next challenge I faced was figuring out how to handle a local NPM module dependency that I wanted to iterate on in the same rapid manner.

## NPM Link Development In A Docker Container

So in this scenario. Lets assume that `web` has an entry in `package.json` like this:
``` json
  "dependencies": {
   "customModule": "git://github.com/kevzettler/customModule",
   }
```

`customModule` is a NPM module that we maintain and develop. This package.json setup works fine for production because we just install from the repo and forget about it. In development we want to rapidly make changes to `customModule`and not have to rebuild everything. Normally when developing on local machine, we would `cd` into `web` and do `npm link customModule` which would build a symlink to our `customModule` code that would give us a rapid development setup.

When we add Vagrant and Docker to the dev environment, this completly breaks NPM Link.

Here's an updated directory diagram of our project with the new `customModule` code:
``` bash
/Projects/demo/
├── Vagrantfile
├── web
└── customModule
```

So similliar to the web code, Vagrant will mount our customModule code at `/vagrant/customModule`

We can then update our VagrantFile to add a new Docker Volume:
`-v '/vagrant/engine:/dist/node_modules/engine'`

``` ruby
    d.run "web",
          cmd: "forever -w index.js",
          args: "-v '/vagrant/web:/srv/www'\
                 -v '/vagrant/customModule:/dist/node_modules/customModule'\
                 -e NODE_ENV=development\
                 -p 5000:5000"

```

### What's All This Symlink Business Then?

So we have this symlink in 2 places.

* The `RUN` symlink in Web Dockerfile
    `RUN ln -s /dist/node_modules /srv/www/node_modules`

* In 'Filesystem' symlink
    `node_modules -> /dist/node_modules/`

Docker does not support symlinks when using the `ADD` command in a DockerFile.
It will drop them from the `ADD` filesystem. That's why we need the `RUN` symlink in the dockerfile.

When we want to do development work, we run the container with the `-v` flag to mount our local code. The volume doesn't get attached until after our container has already been created. At that time, the `RUN` symlink exists; however, the `-v` option overrides everything in the container's `/srv/www/`, wiping out the `RUN` symlink.

But wait! We have a 'Filesystem' symlink in our shared code. The volume respects this symlink and it routes internally to the container's filesystem. You don't necessarily have to commit the symlink to your repo like I was dong. You just need it around when you build the Docker image. I committed it because I kept forgetting. Try this out and let me know if you have a better solution to it.
