---
layout: post
title: Write Your JavaScript Like Its Lisp
category: Programming
tags:
  - JavaScript
  - Conventions
---

### tldr;
* Abstract anonymous functions into named functions to avoid nesting callbacks.
* Avoid using local variables of a shared scope in nested anonymous functions.
* Abstract large JavaScript object declaration into smaller generator functions.

## Or 'How To Avoid Callback Hell'.
I have been meaning to write this post for some time now. Basically since Node.js came onto the spotlight and people started complaining about JavaScript code maintainability and readability due to
nested callbacks and other asynchronous patterns. This is also highly relevant now with the rise of backbone.js and the discussion for best practices there. Writing JavaScript like Lisp is a bit of an generalization. More specifically, I mean write JavaScript like it’s a functional language, which it is. 
By this, I mean write it as small composable functions. I'll show a few patterns I use that can help keep your JavaScript more manageable. Let’s get into some code examples.

## A standard jQuery Ajax button event.
This is fairly common pattern. A button click event triggers an Ajax request. The Ajax request has callbacks for success and error. The success callback triggers another procedure of rendering or possibly another Ajax chain.
The error function does some animation to the button and then does some Ajax to log the error. 

{% highlight javascript %}
    $('button').click(function(event){
      $.ajax({
        url: "http://coolsite.com"
        ,data: {
          "lots" : "of"
          ,"json" : "data"
        }
        ,success: function(data){
          $('button').fadeOut(function(){
            alert('Ajax success!');
          });
        },
        error: function(data){
          $('button').animate({top: '20px'}, function(){
            $.get("http://coolsite.com/logger", function(){
               console.log('error happened');
            });
        });
        }
      });
    });
{% endhighlight %}

Everything is stuffed into the click handler. All of the Ajax response functions are nested in the scope of the anonymous click handler function.
While this is not necessarily a bad practice, it can promote the growth of unmanageable code. 

A familiar scenario, someone might declare a local variable at the top of the click handler declaration and then reference it throughout the nested anonymous functions. This will essentially cause the `success` and `error` callbacks to be dependent on their nested position.

## How can we make this better?
Well lets break it up into smaller pieces. More manageable pieces.

{% highlight javascript %}
    function ajaxSuccessHandler(data){
      $('button').fadeOut(function(){
        alert('Ajax success!');
      });
    }

    function ajaxErrorHandler(data){
      $('button').animate({top: data.top}, function(){
        $.get("http://coolsite.com/logger", function(){
          console.log('error happened');
        });
      });
    }

    function buttonClickHandler(event){
      $.ajax({
        url: "http://coolsite.com"
        ,data: {
          "lots": "of"
          ,"json": "data"
        }
        ,success: ajaxSuccessHandler
        ,error: ajaxErrorHandler
      });
    }

    $('button').click(buttonClickHandler);
{% endhighlight %}

## Its Okay to use named functions.
We've made a few small abstractions. We've moved the anonymous functions that handle the button click, Ajax success, and Ajax error into separate named functions. 
Simply giving the anonymous functions names and moving them out of the nested pattern has significantly improved this code. 

Visually the code is now easier to parse. The callbacks are now standalone units that can be tested in isolation.
We could easily write a unit test for `ajaxSuccessHandler` that called it with a dummy data object and ensured it was functioning correctly. This is significantly harder when nesting anonymous functions.

Stack traces now become more useful as well. Trying to hunt down a bug in a stack trace that is 3 layers deep in anonymous functions is not helpful. If the functions are named its much easier to track down issues.

Another added benefit of this pattern is that it now makes it easy to annotate our functions to utilize the features of [Google's Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler).
This opens up the opportunity to add strict type checking to our JavaScript.


Expanding on our re-factor, we could have abstracted the anonymous callbacks passed to the `fadeOut` and `animate` invocations. Also the callback passed to our `$.Get` call is ripe for naming as well.
For this small example we'll skip editing them as its a bit overkill. In larger code bases you'll see those functions swell.

## Generate large objects from named functions.
This next example is a bit exaggerated but gets the concept across. 
Often times you may have some JavaScript objects defined inline as a parameter or local variable.
In our example, we have the `$.ajax` method which takes an Object as its parameter and a child object as the `data:` value.
In our next example code, we abstract these small objects in to some simple named functions that simply return the objects.

{% highlight javascript %}
    function ajaxSuccessHandler(data){
      $('button').fadeOut(function(){
        alert('Ajax success!');
      });
    }

    function ajaxErrorHandler(data){
      $('button').animate({top: data.top}, function(){
        $.get("http://coolsite.com/logger", function(){
          console.log('error happened');
        });
      });
    }
    
    function buttonClickAjaxData(){
      return {
          "lots": "of"
          ,"json": "data"
        };
    }
    
    function buttonClickAjaxObj(){
      return {
        url: "http://coolsite.com"
        ,data: buttonClickAjaxData()
        ,success: ajaxSuccessHandler
        ,error: ajaxErrorHandler
      };      
    }

    function buttonClickHandler(event){
      $.ajax(buttonClickAjaxObj());
    }

    $('button').click(buttonClickHandler);
{% endhighlight %}

This abstraction lets us contain the objects in to smaller functions that can be unit tested and managed much easier.
Again this is an exaggerated example and a bit overkill in this case, but definitely useful for larger objects.

## Just for fun.
For fun let’s look at the above example in some bad pseudo Lisp. 

> __Disclaimer__ I am by no means a certified Lisper. 
> The extent of my experience with Lisp is a few toy projects in Scheme and Common Lisp. The following code is meant to be more of visual aid than a functional program.

### Our nested Ajax procedure.
I've simplified `success` and `error` callbacks for this example to make them simple calls to `alert`
You can see this is visually similar to the way JavaScript nests anonymous functions.
This example makes use of Lisps anonymous functions with `lambda`. `lambda` is equivalent to JavaScripts `(function(){})`

{% highlight cl %}
                       
    (on-click (lambda (event)
      (ajax pseudo-data
        (lambda (data) ; success
          (alert data))
        (lambda (data) ; error
          (alert data)))))
        
{% endhighlight %}
  
## After our re-factor.
Below you can see that a similar clarity arises to our Lisp code when we abstract the anonymous functions in to named ones.
We now have self-contained small units of code that are much more manageable.
{% highlight cl %}
                       
    (defun success-callback (data) (alert data))

    (defun error-callback (data) (jax-log data))

    (defun click-handler (event)
      (ajax pseudo-data success-callback error-callback))
  
    (on-click click-handler)

{% endhighlight %}

## In conclusion

If you're coming from a traditionally synchronous, procedural programming background. These patterns may not be a silver bullet for you. 
This doesn't eliminate the need for callbacks. Hopefully it will help you manage them better. The code, in parts, is still written and executed in a non-sequential order. 


