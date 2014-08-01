---
title: offset
short: Listener - Date has been changed
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
etype: "Listener"
---

This trigger is received when the datebox control is changed.



{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'offset' ) {
    alert('New datet: ' + passed.newDate);
    alert('Field offset: ' + passed.type);
    alert('Offset amount: ' + passed.amount);
  }
});
{% endhighlight %}

### Arguments Recieved

 - **newDate** : JavaScript Date() object of the new date
 - **type** : Field Changed
   - *y* - Year
   - *m* - Month
   - *d* - Date
   - *h* - Hour
   - *i* - Minute
   - *s* - Second
   - *a* - Meridiem
 - **amount**: Amount of change, +/-

