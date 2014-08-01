---
title: overrideCustomSet
short: Set button for custom modes (i18n aware)
modes: [
	'custombox',
	'customflip'
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "Looks Good"
dattype: "String"
dyn: "True"
---

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideCustomSet": "Override Text"}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)

Note that this can and *should* be included in a language pack.  Of course, drop
the 'override' to become 'customSet'.  It does not exist in any of the distributed
language packs.
