---
title: disable
short: Disable the DateBox
short2: Listener - DateBox has been disabled
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
This function will disable the DateBox control.

{% highlight js %}
$(input).datebox('close');
{% endhighlight %}

</div></div>


<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Listener
</h3></div>
<div class="panel-body">
This trigger is received when the datebox control is disabled

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'disable' ) {
    alert('Datebox was disabled!');
  }
});
{% endhighlight %}
</div></div>