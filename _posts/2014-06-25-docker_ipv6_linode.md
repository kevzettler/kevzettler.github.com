---
layout: post
title: How To Route Docker.io Containers To Public IPV6 on Linode
category: Programming
tags:
  - JavaScript
  - Conventions
  - Docker.io
  - IPV6
  - Linode
---

* If you want to us ipv6 with docker.io on linode make sure you have the following `sysctl` set
  * `net.ipv6.conf.all.accept_ra = 2`
  * `net.ipv6.conf.all.forwarding = 1`
* Then you can pretty much follow this post http://zargony.com/2013/10/13/ipv6-in-docker-containers
* If you want auto configured addresses you can install and configure `radvd`
