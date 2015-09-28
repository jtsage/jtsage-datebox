---
title: highDates
short: List of dates to highlight
modes: [
	'calbox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Array"
dyn: "True"
---

A list of dates to highlight with {% api_doc themeHighDates %}

**Example** (December 2000 Holiday Seson)
{% highlight json %}
["2001-01-01", "2000-12-31", "2000-12-25", "2000-12-24"]
{% endhighlight %}

