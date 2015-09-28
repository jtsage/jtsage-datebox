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

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Trigger
</h3></div>
<div class="panel-body">

This will set the date for the DateBox control.

{% highlight js %}
$(input).trigger('datebox', {'method':'set', 'value':&lt;STR Date>});
{% endhighlight %}

This is similar to {% api_doc setTheDate %}, however, this traditionally expects a 
**formatted date string**, but will accept a Date() object.  It is far, far
preferable to use the {% api_doc setTheDate %} function.

</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Listener
</h3></div>
<div class="panel-body">

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

</div></div>