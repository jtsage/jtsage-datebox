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

## As a Function

This function will enable the datebox control.

{% highlight js %}
$(input).datebox('enable');
{% endhighlight %}

## As a Listener
This trigger is received when the datebox control is enabled.

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'enable' ) {
    alert('Datebox was enabled!');
  }
});
{% endhighlight %}
