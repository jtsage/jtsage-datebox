---
title: slideFieldOrder
short: Field order for slide mode
modes: [
	'slidebox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "array('y', 'm', 'd']"
dattype: "Array"
dyn: "True"
---

If you want a slider that does date and time, try something like:

{% highlight js %}
overrideSlideFieldOrder: ["y","m","d","h","i"]
{% endhighlight %}
