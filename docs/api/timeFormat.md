---
title: timeFormat
short: Format for clock
modes: [
	'timebox',
	'timeflipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "24"
dattype: "Integer"
dyn: "True"
---

Note: this is a i18n option.  To override for single use, you must use:

Valid options are 12 and 24

{% highlight json %}
{"overrideTimeFormat": "Override Text"}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)

