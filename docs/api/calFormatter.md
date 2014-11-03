---
title: calFormatter
short: Control formatting of the calbox Date Text
modes: [
	'calbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "true"
dattype: "Function"
dyn: "False"
---

This option allows you to add a replacement formatter for the individual dates in the calendar
grid display - by default, it is simply the Date (number) with no extra formatting.

This needs to be either a 

 * fully defined function
 * reference to a function defined in window
 
The function must accept a single argument, which is an object of the Date:

{% highlight js %}

{
	"Year" : 0, // Integer
	"Month : 0-11, // Integer, Jan = 0 .. Dec = 11
	"Date" : 1-31 // Integer
}

{% endhighlight %}

As usual, the easiest method of passing the function in is as a reference.  This sample function
will italicize the "tens" dates (10 - 19) - although it is pretty much useless, it gives the idea:

{% highlight js %}
window.myFormatter = function( date ) {
	if ( date.Date > 9 && date.Date < 20 ) {
		return "<i>" + date.Date + "</i>";
	} else {
		return date.Date;
	}
}

{% endhighlight %}

Then, to link it to datebox, it could be as easy as:

{% highlight html %}
<input type="text" data-role="datebox" data-datebox-mode="calbox" data-datebox-calFormatter="myFormatter">
{% endhighlight %}

