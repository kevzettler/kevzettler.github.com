---
layout: post
title: Sass, Scss And Whitespace Syntax
category: Programming
tags:
  - JavaScript
  - Conventions
---

### tldr;
* Scss is not Sass
* Scss is training wheels for Sass
* Both are better than Css

## You might as well write CSS
I prefer Sass. Not Scss. I like the whitespace, indentation style syntax. I feel
that it is a natural evolutionary step to CSS. I feel that Scss is a transitory
state. People gravitate towards Scss and Less because they aren't as drastic a 
visual change. Theres familiar curly brackets which means less of a learning 
curve right?

If you're writing good styles you should be writing in a OOCSS manner

```sass

.root
	display: block
	height: 30px
	width: 200px
  ul
    li
      display: block
      float: left
```

### Well you must love Haml!
No. The whitespace indentation doesn't make sense for writing HTML. 

### Well you must love CoffeeScript!
Sort of. I have opinions on CoffeeScript that extend beyond the whitespace 
discussion. I feel the whitespace does bring a positive benefit to standard 
JavaScript syntax.

```Coffescript
	jQuery("#neat")
	      .data("cool", "dsl")
	      .css({"color": "red"});
```

```Javascript
	jQuery("#neat")
	      .data("cool", "dsl")
	      .css({"color": "red"});
```