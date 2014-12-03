---
title: dateVisible
short: Return if selected calendar date is visible
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
rettype: "JavaScript Date() Object"
---

Return if the selected calendar date is visible.  Only valid for calbox, otherwise it will
always return true.

{% highlight js %}
$(input).datebox('dateVisible');
{% endhighlight %}
