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

## As a Function
This function can be used to close the control.

{% highlight js %}
$(input).datebox('open');
{% endhighlight %}

## As a Trigger
This trigger will close the datebox control

{% highlight js %}
$(input).trigger('datebox', {'method':'open'})
{% endhighlight %}
