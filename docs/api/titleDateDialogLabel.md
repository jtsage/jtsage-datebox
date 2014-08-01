---
title: titleDateDialogLabel
short: Date modes fallback header label
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "Set Date"
dattype: "String"
dyn: "True"
---

Fall-back when there is no associated label element

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideTitleDateDialogLabel": "Override Text"}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)


