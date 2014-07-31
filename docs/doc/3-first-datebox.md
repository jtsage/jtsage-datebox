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
=> data-datebox-after-today. Note that this is only called if the data-options attribute
does not exist.
