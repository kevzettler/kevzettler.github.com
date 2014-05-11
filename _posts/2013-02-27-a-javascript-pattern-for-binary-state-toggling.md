---
layout: post
title: A Pattern For Binary State Toggling.
category: Programming
tags:
  - JavaScript
  - Conventions
---

# A pattern for binary state toggling.

Here's a pattern I stumbled upon that i've found to be super helpful

```javascript
hover function(bool){
  var toggleMethods = ["removeClass", "addClass"],
      bit = Number(Boolean(bool));
      
  $('a')[toggleMethods[bit]]('Classname');
}
```
