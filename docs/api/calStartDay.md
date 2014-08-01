---
title: calStartDay
short: Day of week to start calendar on
modes: [
	'calbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "0"
dattype: "Integer"
dyn: "True"
---

Zero based (0=Sunday...6=Saturday)

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideCalStartDay": 1}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)



