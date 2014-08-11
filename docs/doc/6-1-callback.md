---
title: Callbacks / Listeners
pagenum: 16
layout: doc
---

# Callbacks

DateBox provides both and open and close callback hook as an option.  See 
the next page for a bit on usage, and the API documents on usage enviroment.

 - {% api_doc openCallback %} : Callback function to run on control open
 - {% api_doc openCallbackArgs %} : Extra arguments to pass to open callback.
 - {% api_doc closeCallback %} : Callback function to run on control close
 - {% api_doc closeCallbackArgs %} : Extra arguments to pass to close callback.

## Callback as a reference

The easies method of linking a callback is by reference.  For instance:

{% highlight js %}
window.someFunction = function(objA, param1, ...) {
	// Do Something
}
{% endhighlight %}

Then, to link it to datebox, it could be as easy as:

{% highlight html %}
<input type="text" data-role="datebox" data-datebox-mode="calbox" data-datebox-openCallback="someFunction">
{% endhighlight %}

or,

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode": "calbox", "openCallback": "someFunction"}'>
{% endhighlight %}

## Callback Arguments

The first argument to any callback function, open or close, is an object of "useful" datebox values.  They are:

 - *date* : The JavaScript date object of the current (choosen) date - Always defined, even if meaningless.
 - *initDate* : The JavaScript date object that holds the widget creation time/date. Always defined.
 - *duration* : The last entered duration, in seconds for duration modes - undefined if not.
 - *custom* : The array of chosen CustomFlip indexes if appropriate, undefined if not.

 The second and beyond arguments are the members of the closeCallbackArgs / openCallbackArgs array.  When
 writing functions, it is important to keep in mind that openCallBackArgs[0] === arguments[1].

 Although it is not often useful for the object to be returned on openCallback, it still is to provide a consistent
 prototype between open/close.

## Callback Return Values

The return value of closeCallback is not used in any way. It is simply discarded.

If the return value of openCallback is "false" (===), the control will immediatly close again. 
While it would be likely be preferable to not open the control at all, this concession was made 
to be able to take advantage of jQM's built-in "afteropen"/"afterclose"

# Listeners

DateBox also provides a few "global" listeners.  They are:

 - {% api_doc dateboxbeforecreate %} : Triggered on every page if datebox is loaded. Somewhat useless
 - {% api_doc dateboxcreate %} : Triggered when a datebox is enhanced - but thrown prior to initialization. Useful only to check if there *is* a datebox on the page
 - {% api_doc dateboxaftercreate %} : Triggered when after a datebox is enhanced
