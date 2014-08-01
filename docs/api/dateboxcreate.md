---
title: dateboxcreate
short: Trigger - DateBox Enhance
modes: [
]
cats: [ 'event2' ]
relat: "event2"
layout: event
etype: "Trigger"
---

Triggered when a datebox is enhanced - but thrown prior to initialization.  
Useful only to check if there *is* a datebox on the page.

{% highlight js %}
$(document).on('dateboxcreate', '.ui-page-active', function() {
  alert('A DateBox is being made');
});
{% endhighlight %}


