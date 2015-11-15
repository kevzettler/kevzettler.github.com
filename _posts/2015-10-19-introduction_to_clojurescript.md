---
layout: post
title: Introduction to ClojureScript
category: Programming
tags:
  - JavaScript
  - Node.js
  - ClojureScript
---

# Introduction To ClojureScript
In this article, we'll be discussing ClojureScript a compile-to-javascript language. We'll be looking at the benefits of working with ClojureScript and how you can quickly get set up to use NPM and your favorite Node.js libraries.

## Why ClojureScript?
There are many articles online explaining the benefits of ClojureScript. Some aggregated high level points are:

* __Simplicity__

    With regard to syntax, ClojureScript is a Lisp based language. Lisp languages have minimal syntax, so minimal in fact, that we'll be able to cover the syntax in this article. In addition to the simple syntax. ClojureScript also offers tools to help simplify asynchronous code.

* __Safety__

    This means less bugs! ClojureScript and other functional programming languages have many properties that help reduce and mitigate common bugs. 

* __Performance__

    ClojureScript utilizes [Google's Closure Compiler](http://code.google.com/closure/compiler/docs/api-tutorial3.html). This allows ClojureScript to utilize dead code elimination and other features.

* __Live Coding__

    The ClojureScript ecosystem provides many tools to enable "live coding". This means that once you change your code, it is instantly reflected in your live project. In this article, we'll be looking at [Figwheel](https://github.com/bhauman/lein-figwheel).

* __Code Reuse__

    ClojureScript can be run universally which is also called "isomorphically." This means you can run the same code on your client and your server. This has become a popular pattern in the Node.js ecosystem. In addition, ClojureScript can import libraries from the Node and Java ecosystems.

## Setting Up The Clojure(Script) Tool Chain
In this article, we'll be installing the tool chain on a Mac OSX Environment. We'll need a few system dependencies to get started.

### [Homebrew](https://github.com/Homebrew/homebrew) 
  the popular osx package manager.

### Install The Latest Java Version. 
ClojureScript requires the latest Java version. Version 8 at the time of this post. If anytime during these exercises you encounter an error running `lein` that looks like:

```
Exception in thread "main" java.util.regex.PatternSyntaxException: 
    Unknown inline modifier near index 2 (?U)^[\p{Alpha}_$]^, compiling:(cljs/util.clj:158:33)
```

You need the latest Java.

```
brew tap caskroom/cask
brew install brew-cask
```

If you get the error "already installed", follow the instructions to unlink it, then install again:

```
brew unlink brew-cask
brew install brew-cask
```
And then finally:

```
brew cask install java
```


### Installing Leiningen
Leiningen is a [build tool for Clojure projects](http://leiningen.org/#install). We'll use it to run ClojureScript code and install dependencies. This next step assumes that [Homebrew](https://github.com/Homebrew/homebrew) is installed giving us the `brew` command.

`brew install leiningen`

## Using The Repl
Now that we have Leningen installed, we can start getting familiar with ClojureScript syntax.

Execute the following command at a terminal: `lein repl`

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

We're now in a ClojureScript Repl. This allows us quickly execute ClojureScript and view the result.


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

### Functions All The Way Down
Functions are the building blocks of ClojureScript. You even define your own functions using the built in `defn` function.

```
user=> (defn myfunction [argument1] argment1)
```
Here we've defined a function named `myfunction`. It takes one argument `argument1` and returns it. It is not a very useful function but it is a good example of syntax. This is equivalent to the following Javascript:

```javascript
function myfunction(argument1){
    return argument1;
}
```

Functions are invoked by wrapping their name and arguments with parentheses:

```
user=> (myfunction "hello world")
"hello world"
```

In non-functional programming languages there are special "operators" or keywords. 
In Javascript, some commonly used operators are are `+ - == if`. In ClojureScript and other Lisp languages, there are no special operators. These are just regular functions. 

If statements are functions:

```
user=> (if true "do true stuff here" "do false stuff here")
"do true stuff here"
```

Math operators are functions:

```
user=> (+ 2 3)
5
user=> (* 2 3)
6
```

For more great examples of [Javascript to ClojureScript synonyms checkout this site](https://kanaka.github.io/clojurescript/web/synonym.html)
To exit the repl press `Control+D`

## Creating A Node.js - ClojureScript Project
Starting a ClojureScript project is simple. Leningen offers project templates that will get you up and running with a boilerplate project.
Templates are a great resource to play around with and see other uses and configurations for ClojureScript projects. [Clojars.org has a collection of templates](https://clojars.org/search?q=template) and others can be found searching the web. For our project we'll be using a [Nodejs Figwheel project template](https://github.com/malyn/figwheel-node-template). At your terminal, run:

```
$ lein new figwheel-node hello-world
$ cd hello-world
$ npm install
```

This creates a new ClojureScript project in the directory `./hello-world`. The rest of this post assumes `hello-world` was used as the project name. You may have issues if using a different name. Change to that directory and install NPM dependencies.

### Points Of Interest

* `package.json`
This should be familiar from Node.js projects. Our NPM dependencies will be added here.

* `project.clj`
This file is the ClojureScript project configuration file. This is ClojureScripts version of package.json. This is where we configure Clojure dependencies and compilation targets. This file also contains project details like title and description.

* `figwheel.js`
This file is specific to Figweel projects. It is the bootstrap file for our project. It points Figwheel to our source code so that it can monitor it for updates. We'll be running it with `node figwheel.js`

* `./src/hello_world/core.cljs`
This is our entry-point source file. This is where we'll start the project. Think of it similar to a index.js file in a Node project.
I've added comments below to explain what's going on.
```
;; This defines a namespace and necesscary dependencies for the current file
(ns hello-world.core
  (:require [cljs.nodejs :as nodejs]))

;; This updates the default println method to write to Node.js stdout
(nodejs/enable-util-print!)

;; The main function of the module
;; it prints "Hello World!" to stdout
(defn -main []
  (println "Hello world!"))

;; *main-cli-fn* is a semi-magic var that's used to set the entry
;; *point for a node app
(set! *main-cli-fn* -main)
```

### Running The Project

To execute the current project, open a terminal window and change directories to our hello_world project directory. Execute the following:
```lein figwheel```

This will start Figwheel waiting for updates to build. Leave this terminal running. In a separate terminal, again change to the project directory and execute:

```node figwheel.js```

You should see "Hello world" output like:

```
$ node figwheel.js
Hello world!
Figwheel: trying to open cljs reload socket
Figwheel: socket connection established
```

## Using Express.js For A Webserver
Now that we have the base of a ClojureScript project setup, let's start working with some familiar libraries.
In a new terminal. In our `hello_world` directory execute: 

`npm install --save express`

Update `./src/hello_world/core.cljs` to the following:

```
(ns hello_world.core
  (:require [cljs.nodejs :as nodejs]
            [clojure.string :as string]))

(nodejs/enable-util-print!)

(defonce express (nodejs/require "express"))
(defonce http (nodejs/require "http"))
(defonce server-port 3000)

;; app gets redefined on reload
(def app (express))

(. app (get "/hello"
      (fn [req res] (. res (send "Hello world")))))

(def -main
  (fn []
    (doto (.createServer http #(app %1 %2))
      (.listen server-port))))
    (println (string/join " " ["Server running on" server-port]) )
    

(set! *main-cli-fn* -main)
```

Now when you run `node figwheel.js` on the project, you should see output saying
`running on 3000`
in your browser hit http://localhost:3000/hello and you should see the return of our express route saying "hello world."


## Conclusion
To wrap up this article, we've discussed how to setup a new ClojureScript project and install a popular Node dependency in it. This gives us a great base to get more familliar with ClojureScript as a language. I've also put together source code for [this project here](https://github.com/kevzettler/clojurescript-express-react). It goes a bit beyond this article and demonstrates how to integrate React server side rendering.


