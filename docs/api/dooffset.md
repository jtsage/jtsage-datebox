---
title: dooffset
short: Trigger -  Change the date
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
etype: "Trigger"
---

This trigger will change the internal date of datebox.  Functionally identical 
to hitting a +/- button in the control, or sliding/flipping a value

{% highlight js %}
$(input).trigger('datebox', {'method':'dooffset', 'amount': <INT amount>, 'type': <CHAR field>})
{% endhighlight %}

Required Arguments:

 - **INT amount** : Integer amount to offset, +/-
 - **CHAR field** : Date part to change:
   - *y* - Year
   - *m* - Month
   - *d* - Date
   - *h* - Hour
   - *i* - Minute
   - *s* - Second
   
