---
title: dorefresh
short: Trigger -  Refresh control
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
etype: "Trigger"
---

This trigger will refresh the datebox control.  Functionally equivalent to the 
public refresh function

{% highlight js %}
$(input).trigger('datebox', {'method':'dorefresh'})
{% endhighlight %}
