---
title: headerFormat
short: Format for header if used
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox'
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "%A, %B %-d, %Y"
dattype: "String"
dyn: "True"
---


Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideHeaderFormat": "Override Text"}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)

For more information on date format variables, see: [Output Formats]({{site.basesite}}doc/3-3-output/)

