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
	"Month" : 0-11, // Integer, Jan = 0 .. Dec = 11
	"Date" : 1-31, // Integer
	"ISO" : YYYY-MM-DD, // ISO Date Representation
	"Comp" : YYYYMMDD, // Little endian date compare representation
	"dateVisible" : bool // Selected date is on the screen
}

{% endhighlight %}

The function can return either just a String/Number, *or* an object of the type:

{% highlight js %}

{
	"text": "Text or HTML to display",
	"class": "myClass1 myClass2" // List of classes to add to grid box
}

{% endhighlight %}

The return value is parsed for each value, so you can return an object only where necessary if you
prefer. As usual, the easiest method of passing the function in is as a reference.  This sample function
will italicize the "tens" dates (10 - 19) - although it is pretty much useless, it gives the idea:

{% highlight js %}
window.myFormatter = function( date ) {
	if ( date.Date > 9 && date.Date < 20 ) {
		return { 
			text: "<i>" + date.Date + "</i>",
			"class": "makeItRed"
		};
	} else {
		return date.Date;
	}
}

{% endhighlight %}

Then, to link it to datebox, it could be as easy as:

{% highlight html %}
<input type="text" data-role="datebox" data-datebox-mode="calbox" data-datebox-calFormatter="myFormatter">
{% endhighlight %}

Dynamically changing the function:

Admittedly, the function below is probably even more useless than the first one, but it demonstrates the principle:

{% highlight js %}
$('#datebox_input_element').datebox({ 'calFormatter': function( date ) { return date.Month; } });
{% endhighlight %}

