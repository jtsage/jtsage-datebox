---
title: highDays
short: Highlight these days
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

Array of days to highlight with {% api_doc themeHighDays %}, zero based (0=Sunday...6=Saturday)


**Example** (Weekends)
{% highlight json %}
[0,6]
{% endhighlight %}

