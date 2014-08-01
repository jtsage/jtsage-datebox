---
title: monthsOfYear
short: Months of the year
modes: [
	'datebox',
	'calbox',
	'slidebox',
	'flipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "['January' ... 'December']"
dattype: "Array"
dyn: "True"
---

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideMonthsOfYear": <Array>}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)



