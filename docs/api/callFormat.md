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
$(input).datebox('callFormat', <String format>, <Date Object>, <Allow Arabic-Indic Numerals>);
{% endhighlight %}

This will use the DateBox formatter library to format a JavaScript Date Object to
the specified String date format. This function returns a string.

The last parameter can be used to suppress the Arabic-Indic numeral replacement when using a 
locale that uses Arabic-Indic numerals. This defaults to false (supressed) for the callFormat() function.

For more information on date format variables, see: [Output Formats]({{site.basesite}}doc/3-3-output/)
