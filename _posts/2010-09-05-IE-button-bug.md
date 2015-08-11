---
layout: post
title: IE Button Bug
---

I recently encountered an annoying bug in multiple versions of IE regarding forms and button elements. I am writing about it to remind myself in the future and to hopefully save time for someone else. The bug spawned from my decision to use `<button>` elements over `<input type="submit">` elements as the submit buttons for my forms. I chose button elements because they are generally more consistent in cross browser rendering and also allow for more semantic textual content than text in the input element's type attribute.
The behavior of modern browsers matched my own expected behavior. That is:

if a from element contains a button element, and no input `type='submit'`, that button should trigger the submit event of the form

However, IE does not.

"IE will not fire a form submit event on a `<button></button>` click by default."

I found this out after testing in IE and discovering that none of the forms on a site would submit. I first assumed that it was some bug with an inline validation plugin that I had used. The submission bug remained after disabling the plugin.

Solutions to this bug were: 

Replace all the button elements with input `type='submit'` and apply the button styles. 
Or attach an explicit click event to the button elements that would fire the parent form elements submit event.
