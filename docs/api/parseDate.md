---
title: parseDate
short: Parse a string date to an object
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
defval: ""
dattype: "String"
rettype: "JavaScript Date Object"
---

{% highlight js %}
$(input).datebox('parseDate', <String format>, <String Date>);
{% endhighlight %}

This will use the DateBox formatter library to parse a string Date and return
a JavaScript Date Object.

For more information on date format variables, see: [Output Formats]({{site.basesite}}doc/3-3-output/)
