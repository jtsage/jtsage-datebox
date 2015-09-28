---
title: open
short: Open the datebox
short2: Trigger - Open Datebox
modes: [
]
cats: [ 'event', 'public' ]
relat: "public"
layout: func2
rettype: "jQuery Object (datebox input element)"
etype: "Trigger"
---

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Function
</h3></div>
<div class="panel-body">
This function can be used to close the control.

{% highlight js %}
$(input).datebox('open');
{% endhighlight %}

</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Trigger
</h3></div>
<div class="panel-body">
This trigger will close the datebox control

{% highlight js %}
$(input).trigger('datebox', {'method':'open'})
{% endhighlight %}

</div></div>