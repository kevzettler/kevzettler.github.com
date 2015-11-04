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
In this article we will be discussing ClojureScript a compile-to-javascript language. We'll be looking at the benefits of working with ClojureScript and how you can quickly get setup to use NPM and your favorite familiar Node.js libraries.

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
    ClojureScript can be run universally or isomorphically. This means you can run the same code on your client and server. This has become a popular pattern in the Node.js ecosystem. In addition ClojureScript can import libraries from the Node and Java ecosystems.

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
ClojureScript is a functional language. This means it has functions and limited other language constructs. It is a Lisp style language.

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
```
(functionName argument1 argument2)
```

Operators are functions. In imperative programing languages there are special "Operators" or keywords. In Javascript some of these are `+ - = if`

```
user=> (+ 2 3)
5
```

```
user=> (if true "do true stuff here" "do false stuff here")
"do true stuff here"
```

For more great examples of [Javascript to ClojureScript synonyms checkout this site](https://kanaka.github.io/clojurescript/web/synonym.html)


## Creating a Node.js - ClojureScript project
Starting a ClojureScript project is simple. Leningen offers project templates that will give you a ready to go starter kit for a project.

`lein install figwheel hello-world`

## Using Express.js for a webserver
`npm install express`

### integrating Express