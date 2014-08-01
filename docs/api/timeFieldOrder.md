---
title: timeFieldOrder
short: Field order for time entry
modes: [
	'timebox',
	'timeflipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "array('h', 'i', 'a']"
dattype: "Array"
dyn: "True"
---


Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideTimeFieldOrder": <Array>}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)

