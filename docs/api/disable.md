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

## As a Function
This function will disable the DateBox control.

{% highlight js %}
$(input).datebox('close');
{% endhighlight %}

## As a Listener

This trigger is received when the datebox control is disabled

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'disable' ) {
    alert('Datebox was disabled!');
  }
});
{% endhighlight %}
