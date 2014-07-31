---
title: Display Modes
pagenum: 7
layout: doc
---

# Display Modes
This page will give you an overview of the available display modes.  Please take
a look at the next page as well, as all of these modes have  quite a number of small
associated options.

## DateBox Popup - Default
Given no other options, datebox will default to using it's own popup method - while
this method is perhaps not the most efficient and clean available (see below: Built
In Popup), it uses none of jQM's built in methods to place the control - so it should
work on "top" of other dialogs, popups, panels, etc. It is also the method used in
development, so it tends to work with new versions first.
	
<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true}'></div>

## Built-In Popup
With the option {% api_doc enablePopup %}, DateBox will use jQM's built in popup
method.  It is very clean, very fast, and offers a couple of extra options not available
with DateBox's own popup method.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "enablePopup":true}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "enablePopup":true}'></div>

## Dialog
DateBox can also take advantage of jQM's dialog pages.  Please note that this method
is tested pretty much last, as it's a holdover from the initial versions of jQM, and
I'm not sure it has a lot of utility left.  You can enable the dialog mode with {%api_doc dialogEnable %} - 
which means if the window width is less than 400px (very small displays), it will
use the dialog mode - otherwise it will use the DateBox Popup method.  To force the
control to **always** be in a dialog, also set {% api_doc dialogForce %}

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "dialogEnable":true, "dialogForce":true}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "dialogEnable":true, "dialogForce":true}'></div>

## Inline and Inline-Blind
Sometimes (such as in these documents), it is preferable to have the control simply
appear inline with the rest of the form.  To show the control inline, with no hiding
set {% api_doc useInline %}.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":true}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline": true}'></div>

Or, you might want DateBox to mimic the behavior of jQuery-UI - that is, to slide
down the control when you click the input.  To do this, set {% api_doc useInlineBlind %}.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true, "useFocus":true}'></div>
