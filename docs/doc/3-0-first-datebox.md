---
title: First Datebox
pagenum: 3
layout: doc
---

# Your First Datebox

Adding a datebox is as simple as adding a data-role to a date or text input element
and specifying the {% api_doc mode %} you wish to use.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox"}'>
{% endhighlight %}

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":true}'></div>

		
# The "data-options" Object

The data-options attribue of the input will be your best and worst friend - all configuration
of datebox can be done with this object (alternatively, you can do it pogrammatically
or with defaults too).  It is important the the object itself be enclosed in single
quotes, while each string inside of the object be double quoted.  It can work the
other way on some browsers, but not all, and I've yet to find one where this method fails.

## Why "data-options"?

The largest reason for the way the data-options attribute is set up the way it is
 is that it is well-formed JSON. Nearly all of the popular backend languages provide
 an easy way to convert from thier native data structures into JSON, allowing you
 to store your options in an easy to read, easy to manipulate fashion.

## What about "long" options?

Another option is to use "long" options.  For instance, to set the mode, you would
set the "data-datebox-mode" attribute. Camel case becomes dashes, i.e. afterToday
=> data-datebox-after-today. This is now always called, however, data-options will override.

## How about with a constructor?

This method of working is also certainally possible.  When using it, do not set a data-role on the 
input - also, using type="text" is important, as datebox will be unable to degrade the input 
otherwise.

{% highlight html %}
<div><input id="someinput" type="text"></div>
{% endhighlight %}

Then, to enhance it, call datebox() in a script:

{% highlight js %}
$('#someinput').datebox({
    mode: "calbox",
    afterToday: true,
    // ...etc...
});
{% endhighlight %}

This of course makes re-using variables a bit easy, as variables are expanded.

## What about using it as a library?

Using just the datebox library parts (essentially, a detached datebox) is totally possible, with one 
small caveat - you must use {% api_doc useInline %} - it is the act of "opening" a datebox that 
completes initilization - also, if you do not inline it, then open it, it will still display.  Note 
that this could be useful for programatically adding dateboxes to a page, assuming you don't need
to submit the date directly to the server (i.e. using ajax instead). Anyway, to create a detached 
datebox, something like this will work:

{% highlight js %}
var someDate,
    someDateString = "2001-01-01",
    someDateFormat = "%Y-%m-%d",
    db = $("<input>").datebox({
        mode: "calbox",
        useInline: true
    });

someDate = db.datebox( "parseDate", someDateFormat, someDateString );
{% endhighlight %}

For more examples of this, check out the qunit tests in the repo, it's how most of them are done.








