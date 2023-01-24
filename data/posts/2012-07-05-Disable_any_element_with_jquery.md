---
layout: post
title: Disable Any Element With jQuery
category: Code
---

In HTML the [disabled attribute](http://www.w3schools.com/tags/att_input_disabled.asp) alows you to mark an input element as 'disabled' Which will trigger 
the browser to render the input in a 'greyed out' style:

<table style="padding:20px;">
  <tr>
    <td>
      <form>
        <p>Enabled elements</p>
        <button >Click</button><br /><br />
        <input type="text"  value="text" /><br />
        <select ><br />
          <option>Select</option>
        </select>
      </form>
    </td>
    <td>
      <form style="padding-left:40px;">
        <p>Disabled elements</p>
        <button disabled="disabled">Click</button><br /><br />
        <input type="text" disabled="disabled" value="text" /><br />
        <select disabled="disabled"><br />
          <option>Select</option>
        </select>
      </form>
    </td>
  </tr>
</table>


This is helpful for limiting user interaction when an app is in an unknown state. Like waiting for an Ajax response. However this attribute is only available on form input elements.
This is unfortunate if you are heavily using your own custom UI components. Say you have a bunch of buttons throughout your UI that are actually `<a>` elements.

I've ran into this problem on several projects and developed a pattern which grew into a plugin I now use on most projects. You can get the plugin here [download jquery.disable](https://github.com/kevzettler/jquery.disable/downloads)
or check it out and contribute to [jquery.disable on github](https://github.com/kevzettler/jquery.disable) 
