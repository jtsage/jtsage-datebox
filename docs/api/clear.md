---
title: clear
short: Listener - Datebox input has been cleared
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
defval: ""
etype: "Listener"
---

This trigger is received when the datebox control is cleared.

{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'clear' ) {
    alert('Datebox was cleared!');
  }
});
{% endhighlight %}
