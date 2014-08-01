---
title: callFormat
short: Format a date
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
defval: ""
dattype: "String"
rettype: "String"
---

{% highlight js %}
$(input).datebot('callFormat', <String format>, <Date Object>);
{% endhighlight %}

This will use the DateBox formatter library to format a JavaScript Date Object to
the specified String date format. This function returns a string.

For more information on date format variables, see: [Output Formats]({{site.basesite}}doc/3-3-output/)
