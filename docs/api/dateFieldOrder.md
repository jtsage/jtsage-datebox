---
title: dateFieldOrder
short: Field order for date entry
modes: [
	'datebox',
	'flipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "array('m', 'd', 'y']"
dattype: "Array"
---

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideDateFieldOrder": <array>}
{% endhighlight %}

Capitalizing "M" for month in "datebox" mode will enable string representations (short months)
instead.

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)


