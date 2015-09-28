---
title: calBeforeAppendFunc
short: Control formatting of the calbox grid box
modes: [
	'calbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "function (t) { return t; }"
dattype: "Function"
dyn: "True"
---

This option allows you to define a custom function that is called on the **generated calbox grid 
box** of **each** date.

It provides a jQuery object, it expects you to return a jQuery object.

The provided object (in a single argument), is the generated, **complete** jQuery object for the 
date box, which also has the following data pre-defined:

{% highlight js %}

{
	date: ##, // Numeric Date
	enabled: true, // Date can be selected
	month: ##, // Numeric Month, zero based
}

{% endhighlight %}

Example function:

{% highlight js %}
window.printData = function( myObject ) {
	console.log( myObject.data() );
	return myObject;
}

{% endhighlight %}

Then, to link it to datebox, it could be as easy as:

{% highlight html %}
<input type="text" data-role="datebox" data-datebox-mode="calbox" data-datebox-calBeforeAppendFunc="printData">
{% endhighlight %}

Dynamically changing the function:

Admittedly, the function below is probably even more useless than the first one, but it demonstrates the principle:

{% highlight js %}
$('#datebox_input_element').datebox({ 'calBeforeAppendFunc': function( myObject ) { return myObject; } });
{% endhighlight %}

