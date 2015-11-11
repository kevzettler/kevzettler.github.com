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
In this article we will be discussing ClojureScript a compile-to-javascript language. We'll be looking at the benefits of working with ClojureScript and how you can quickly get setup to use NPM and your favorite Node.js libraries.

## Why ClojureScript?
There are many articles online explaining the benefits of ClojureScript. Some aggregated high level points are:

* Simplicity
    Specifically regarding syntax. ClojureScript is a Lisp based language. Lisp languages have minimal syntax. So minimal in fact we will be able to cover the syntax in this article.

* Safety
    This means less bugs! ClojureScript, and other functional programming languages have many properties that help reduce and mitigate common bugs. 

* Performance
    ClojureScript utilizes [Google's Closure Compiler](http://code.google.com/closure/compiler/docs/api-tutorial3.html) This allows ClojureScript to utilize dead code elimination and other features.

* Live Coding
    The ClojureScript ecosystem provides many tools to enable 'live coding'. This meaning, once you change your code its instantly reflected in your live project. In this article we'll be looking at [Figwheel](https://github.com/bhauman/lein-figwheel).

* Code Reuse
    ClojureScript can be run universally, also known as isomorphically. This means you can run the same code on your client and server. This has become a popular pattern in the Node.js ecosystem. In addition ClojureScript can import libraries from the Node and Java ecosystems.

## Setting up the Clojure(Script) tool chain
In this article we will be installing the tool chain on a Mac OSX Environment. We need the latest Java version.

### Installing Leiningen
Leiningen is a build tool for Clojure projects. It will 
http://leiningen.org/#install

`brew install leiningen`

### Using the Repl
Now that we have leningen installed we can start getting familiar with ClojureScript syntax.

execute the following command at a terminal `lein repl`

You should get output that looks similar to:

```
$ lein repl
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
ClojureScript is a functional language. This means it has functions and limited additional language constructs. It is a Lisp style language.

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

### Functions all the way down
Functions are the building blocks of ClojureScript. To define a function, you even call a function `defn`.

```
user=> (defn myfunction [argument1] argment1)
```
Here we've defined a function named `myfunction` it takes 1 argument `argument1` and returns it. Not a super helpful function but a good example of syntax. This is equivalent to the following Javascript.

```javascript
function myfunction(argument1){
    return argument1;
}
```

Functions are invoked by wrapping their name and arguments with parenthesis

```
user=> (myfunction "hello world")
"hello world"
```

In non-functional programing languages there are special "Operators" or keywords. 
In Javascript some commonly used operators are are `+ - == if`. In ClojureScript and other Lisp languages there are no special operators these are just regular functions. 

If statments are functions

```
user=> (if true "do true stuff here" "do false stuff here")
"do true stuff here"
```

Math operators are functions

```
user=> (+ 2 3)
5
user=> (* 2 3)
6
```

For more great examples of [Javascript to ClojureScript synonyms checkout this site](https://kanaka.github.io/clojurescript/web/synonym.html)

## Creating a Node.js - ClojureScript project
Starting a ClojureScript project is simple. Leningen offers project templates that will get you up and running with a boilerplate project.
Templates are a great resource to play around with and see other uses and configurations for ClojureScript projects. [Clojars.org has a collection of templates](https://clojars.org/search?q=template) and others can be found searching the web. For our project we'll be using a [Nodejs Figwheel project template](https://github.com/malyn/figwheel-node-template). At your terminal run:

```
$ lein new figwheel-node hello-world
$ cd hello-world
$ npm install
```

This will create a new ClojureScript project in the directory `./hello-world`, change to that directory and install NPM dependencies.

### Points of interest

* package.json
This should be familiar from Node.js projects. Our NPM dependencies will be added here.

* project.clj
This file is the ClojureScript project configuration file. This is ClojureScripts version of package.json. This is where we configure Clojure dependencies and compilation targets. This file also contains project details like title and description.

* figwheel.js
This file is specific to Figweel projects. It is the bootstrap file for our project it points Figwheel to our source code so it can monitor it for updates. We will be running it with `node figwheel.js`

* ./src/hello_world/core.cljs
This is our entry-point source file. This is where we will start the project. Think of it similar to a index.js file in a Node project.
I've added comments below to explain whats going on.
```
;; This defines a namespace and necesscary dependencies for the current file
(ns hello-world.core
  (:require [cljs.nodejs :as nodejs]))

(nodejs/enable-util-print!)

;; The main function of the module
;; it prints "Hello World!" to stdout
(defn -main []
  (println "Hello world!"))
;;
(set! *main-cli-fn* -main)
```

### Running the project

To execute the current project open a terminal window and change directories to our hello_world project directory. execute the following
```lein figwheel```

This will start figwheel waiting for updates to build. Leave this terminal running. In a separate terminal, again change to the project directory and execute:

```node figwheel.js```

You should see output like

```
$ node figwheel.js
Hello world!
Figwheel: trying to open cljs reload socket
Figwheel: socket connection established
```

## Using Express.js for a webserver
`npm install express`



### integrating Express