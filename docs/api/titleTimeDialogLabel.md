---
title: titleTimeDialogLabel
short: Time modes fallback header label
modes: [
	'timebox',
	'timeflipbox',
	'durationbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "Set Time"
dattype: "String"
dyn: "True"
---

Fall-back when there is no associated label element

Note: this is a i18n option.  To override for single use, you must use:

{% highlight json %}
{"overrideTitleTimeDialogLabel": "Override Text"}
{% endhighlight %}

For more information on the i18n system, see: [Localizing Datebox]({{site.basesite}}doc/3-2-locale/)


