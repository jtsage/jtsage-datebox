---
title: refresh
short: Refresh the DateBox
short2: Listener - Datebox has been refreshed
modes: [
]
cats: [ 'event', 'public' ]
relat: "public"
layout: func2
rettype: "jQuery Object (datebox input element)"
etype: "Trigger"
---

## As a Function
This function can be used to refresh the control.

{% highlight js %}
$(input).datebox('refresh');
{% endhighlight %}

## As a Listener
This trigger is fired when datebox has been refreshed.

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'refresh' ) {
    alert('Datebox was refreshed!');
  }
});
{% endhighlight %}
