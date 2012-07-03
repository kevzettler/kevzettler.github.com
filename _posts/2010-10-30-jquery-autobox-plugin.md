---
layout: post
title: jquery autobox plugin
---

I have worked on several site designs that expect form inputs to render with a default value. Upon focus of the input the default text should clear and allow user input to stick. Sometimes the design calls for this to happen with a password field as well.

Password fields are a special condition as the text is rendered as dots. You cannot dynamically change the 'type' attribute of a password input field. This is a browser security feature. To obtain this behavior with password fields you need to dynamically create a text field on top of the password and hide it on focus. This plugin handles this.

	 "You cannot dynamically change the 'type' attribute of a password input field."


Handle any font colors or styling with css.

Downloads

[download - tar.gz](https://github.com/kevzettler/jquery.autobox/tarball/master)

[download - .zip](https://github.com/kevzettler/jquery.autobox/zipball/master)

 

Installation

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>  
    <script src="jquery.autobox.js" type="text/javascript"></script>  
    <script type="text/javascript"></script>  
    <form> <input value="default text" type="text" /> <input value="default pass" type="pass" /> </form>  

Demo
See it live [here](http://www.callmekev.com/demo)
