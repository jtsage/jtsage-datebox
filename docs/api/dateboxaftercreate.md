---
title: dateboxaftercreate
short: Trigger - DateBox enhancment done
modes: [
]
cats: [ 'event2' ]
relat: "event2"
layout: event
etype: "Trigger"
---


Triggered when datebox enhancment completes.

{% highlight js %}
$(document).on('dateboxaftercreate', '.ui-page-active', function() {
  alert('A DateBox has been made');
});
{% endhighlight %}
