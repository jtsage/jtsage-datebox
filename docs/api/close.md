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

## As a Function
This function can be used to close the control.

{% highlight js %}
$(input).datebox('close');
{% endhighlight %}

## As a Trigger
This trigger will close the datebox control

{% highlight js %}
$(input).trigger('datebox', {'method':'close'})
{% endhighlight %}
