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


<div class="from-group">
	<label for="in1">A DateBox</label>
	<input class="form-control" id="in1" type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":false, "useInlineAlign": "right"}'>
</div>


# Configuration

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
The "data-options" Object
</h3></div>
<div class="panel-body">
The data-options attribue of the input will be your best and worst friend - all configuration
of datebox can be done with this object (alternatively, you can do it pogrammatically
or with defaults too).  It is important the the object itself be enclosed in single
quotes, while each string inside of the object be double quoted.  It can work the
other way on some browsers, but not all, and I've yet to find one where this method fails.
</div></div>


<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
Why "data-options"?
</h3></div>
<div class="panel-body">
DateBox expects the "data-options" attribute to be well formed JSON.  As nearly every backend
language allows simple export to a JSON object (node.js, PHP, etc), this allows you to store
your per-instance options in something other than a string.
</div></div>

{::options parse_block_html="true" /}
<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
What about "long" options?
</h3></div>
<div class="panel-body">

Another option is to use "long" options.  For instance, to set the mode, you would
set the "data-datebox-mode" attribute. Camel case becomes dashes, i.e:

<pre>afterToday => data-datebox-after-today</pre>

Options defined in this fashion will __not__ take precedence over options defined in "data-options".

</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
How about with a constructor?
</h3></div>
<div class="panel-body">

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

</div></div>