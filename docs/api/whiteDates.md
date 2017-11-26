---
title: whiteDates
short: Always allow these ISO dates to be selected
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Array"
dyn: "True"
---

Always allow this list of ISO dates to be selected. 

Overrides all of the limiting methods, this is parsed **last**

**Example** (December 2000 Holiday Seson)
{% highlight json %}
["2001-01-01", "2000-12-31", "2000-12-25", "2000-12-24"]
{% endhighlight %}
