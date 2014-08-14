---
title: set
short: Dual - Set the date
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
etype: "Trigger and Listener"
---

### As a trigger

This will set the date for the DateBox control.

{% highlight js %}
$(input).trigger('datebox', {'method':'set', 'value':<STR Date>});
{% endhighlight %}

This is similar to {% api_doc setTheDate %}, however, this traditionally expects a 
**formatted date string**, but as of 1.5.0, will accept a Date() object.  It is far, far
preferable to use the {% api_doc setTheDate %} function.

### As a listener

This is recieved when the DateBox is set.

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'set' ) {
    alert('Formatted value is: ' + passed.value);
    alert('JavaScript Date object is: ' + passed.date);
  }
});
{% endhighlight %}

Return Values:

 - **value** - Formatted date string
 - **date** - JavaScript Date() object
