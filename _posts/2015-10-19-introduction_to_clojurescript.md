---
layout: post
title: Introduction to ClojureScript
category: Programming
tags:
  - JavaScript
  - Node.js
  - ClojureScript
---

# Introduction to ClojureScript
In this article we will be discussing ClojureScript
a compile-to-javascript language. 

## Why ClojureScript?
There are many articles on line explaining the benefits of ClojureScript

* Safety
    This means less bugs! ClojureScript, and other functional programming languages have many properties that help reduce and mitigate common bugs. 

* Performance
    ClojureScript utilizes [Google's Closure Compiler](http://code.google.com/closure/compiler/docs/api-tutorial3.html) This allows ClojureScript to utilize dead code elimination and other features.

* Live Coding
    The ClojureScript ecosystem provides many tools to enable 'live coding'. This meaning, once you change your code its instantly reflected in your live project. In this article we'll be looking at [Figwheel](https://github.com/bhauman/lein-figwheel).

* Code Reuse
    ClojureScript can be run universally or isomorphically. This mean you can run the same code on your client and server. This has become a popular pattern in the Node.js ecosystem. In addition ClojureScript can import libraries from the Node and Java ecosystems.

## Setting up the ClojureScript tool chain
In this article we will be installing the tool chain on a Mac Osx Environment. We need the latest Java version.

### Installing Leiningen
Leiningen is a build tool for Clojure projects. It will 
http://leiningen.org/#install

`brew install leiningen`

### Using the Repl
Now that we have leningen installed we can start getting familiar with ClojureScript syntax.

execute the following command at a terminal `lein repl`

You should get output that looks similiar to:

```
Kevins-MacBook-Pro:_posts kevzettler$ lein repl
nREPL server started on port 58371 on host 127.0.0.1 - nrepl://127.0.0.1:58371
REPL-y 0.3.7, nREPL 0.2.10
Clojure 1.7.0
Java HotSpot(TM) 64-Bit Server VM 1.6.0_65-b14-466.1-11M4716
    Docs: (doc function-name-here)
          (find-doc "part-of-name-here")
  Source: (source function-name-here)
 Javadoc: (javadoc java-object-or-class-here)
    Exit: Control+D or (exit) or (quit)
 Results: Stored in vars *1, *2, *3, an exception in *e

user=> 
```

We're now in a ClojureScript Repl. This will allow us quickly execute ClojureScript and view the result.


## ClojureScript Syntax

### Primitives

* Number

    ```
    user=> 1.23
    1.23
    ```


* String

    ```
    user=> "foo"
    "foo"
    ```


* Vector (array)
    
    ```
    user=> [:bar 3.14 "hello"]
    [:bar 3.14 "hello"]
    ```


* Map (associative arrays)

    ```
    user=> {:msg "hello" :pi 3.14 :primes [2 3 5 7 11 13]}
    {:msg "hello", :pi 3.14, :primes [2 3 5 7 11 13]}
    ```

* Keyword (used to access Maps)

    ```
    user=> :foo
    :foo
    ```


* Set (distinct array)
    
    ```
    user=> #{:bar 3.14 "hello"}
    #{"hello" 3.14 :bar}
    ```

### Functions
ClojureScript is a Lisp language. Everything in ClojureScript is 


## Creating a Node.js - ClojureScript project

## Using Express.js for a webserver

### building out an express webapp