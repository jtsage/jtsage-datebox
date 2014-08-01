---
title: daysOfWeek
short: Days of the week
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
defval: "array('Sunday' ... 'Saturday']"
dattype: "Array"
dyn: "True"
---

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideDaysOfWeek": <array>}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)



