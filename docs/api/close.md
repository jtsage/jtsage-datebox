---
title: close
short: Close the DateBox
short2: Trigger - Close Datebox
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
$(input).datebox('close');
{% endhighlight %}
</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Trigger
</h3></div>
<div class="panel-body">
This trigger will close the DateBox control

{% highlight js %}
$(input).trigger('datebox', {'method':'close'})
{% endhighlight %}
</div></div>
