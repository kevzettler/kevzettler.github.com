---
layout: post
title: Rapid Local Development with Vagrant, Docker.io and Node.js
category: Programming
tags:
  - JavaScript
  - Conventions
  - Docker.io
  - Vagrant
  - Node.js
---

### tldr;
* Using some thoughtfully placed symlinks you can rig vagrant and docker to instantly reflect your application code updates.


### The Problem
I wanted to use isomorphic [WebRTC](https://github.com/js-platform/node-webrtc) with the awesome [SimplePeer](https://github.com/feross/simple-peer) in a recent Node.js project. However the server WebRTC has a bunch of system level dependencies that are a pain to install. Luckily they provide a [Dockerfile](https://github.com/js-platform/node-webrtc/blob/develop/Dockerfile) which does it all for you. I didn't end up using their exact Dockerfile but copy pasted the majority of it to my project to use as a `Base web` Dockerfile.

{% highlight bash %}
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
{% endhighlight %}

With the `BaseWeb` Dockerfile inplace I then have my Nodejs application. Its structured as follows. 

{% highlight bash %}
/Users/kevisazombie/Projects/web
├── Dockerfile
├── index.js
├── node_modules -> /dist/node_modules/
└── package.json
{% endhighlight %}

Take note here that my `node_modules` is actually a symlink to `/dist/node_modules/` this is commited to my repo. This may seem odd but we'll get to that shortly. First lets look at the other Dockerfile in the `web` application.

{% highlight bash %}
# web DockerFile
FROM base_web
COPY package.json /dist/package.json
RUN mkdir /dist/node_modules && cd /dist && npm install
ADD . /srv/www
RUN ln -s /dist/node_modules /srv/www/node_modules
WORKDIR /srv/www
EXPOSE 5000
CMD ["forever", "index.js"]
{% endhighlight %}

Lets walkthrough this Dockerfile.
`FROM base_web`
Setup all server WebRTC dependencies from our `base_web` image

`COPY package.json /dist/package.json`
Copy `package.json` to `/dist/package.json` in the container.

`RUN mkdir /dist/node_modules && cd /dist && npm install`
Make a `node_modules` directory at `/dist/node_modules` and install our node dependencis there
* The previous 2 setps give us [caching for node_modlues](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)
this way you don’t rebuild your modules each time you re-build your container. If your package.json file changes then your modules will be rebuilt. See this gist for a full example.

`ADD . /srv/www`
Add our application code to the container at `/srv/www`

`RUN ln -s /dist/node_modules /srv/www/node_modules`
Create a sym link on `/srv/www/node_modules -> /dist/node-modules` This overrides our symlink stored in the repo

`WORKDIR /srv/www`
Change the containers working directory to `/srv/www`

`EXPOSE 5000`
Open the containers port 5000 our application runs on that port

`CMD ["forever", "index.js"]`
Set our default container start command to `forever index.js`





