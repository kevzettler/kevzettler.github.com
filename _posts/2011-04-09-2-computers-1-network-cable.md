---
layout: post
title: How to transfer files between two computers over ethernet
category: Protip
---

I find from time to time that I need to do this. I always forget how So i'm writing this quick post to help me remember and help anyone else that stumbles onto this.

Disable both computers wireless adapters.

Connect them to each other over ethernet.

Set each computers ethernet adapter settings to static ip addresses. I usually do 192.168.1.101 and 102 respectively.

Set each computers router/gateway ip to point at the other.

You should be able to ping each computer's ip from the other at this point.

Make sure both computers share the same WINS workgroup name. They are usually set to WORKGROUP by default.

if you are doing a MAC to PC setup make sure SMB is enabled for the MAC.

Make sure both computers have Guest accounts and all that permissions stuff setup.
