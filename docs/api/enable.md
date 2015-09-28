---
title: enable
short: Enable the datebox
short2: Listener - Datebox has been enabled
modes: [
]
cats: [ 'event', 'public' ]
relat: "public"
layout: func2
rettype: "jQuery Object (datebox input element)"
etype: "Listener"
---

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Function
</h3></div>
<div class="panel-body">

This function will enable the datebox control.

{% highlight js %}
$(input).datebox('enable');
{% endhighlight %}

</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Listener
</h3></div>
<div class="panel-body">

This trigger is received when the datebox control is enabled.

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'enable' ) {
    alert('Datebox was enabled!');
  }
});
{% endhighlight %}

</div></div>
