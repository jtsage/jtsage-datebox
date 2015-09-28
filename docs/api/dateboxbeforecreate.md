---
title: dateboxbeforecreate
short: Trigger - datebox loaded
modes: [
]
cats: [ 'event2' ]
relat: "event2"
layout: event
etype: "Trigger"
---

Triggered on every page if datebox is loaded.  Pretty much useless.

{% highlight js %}
$(document).on('dateboxbeforecreate', '.ui-page-active', function() {
  alert('DateBox is loaded?');
});
{% endhighlight %}
