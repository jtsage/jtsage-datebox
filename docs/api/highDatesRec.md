---
title: highDatesRec
short: List of recurring dates to highlight
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


Array of arrays of dates that are to be highlighted with {% api_doc themeHighDatesRec %}. Each inner array is in the format:

{% highlight json %}
[<year>, <month>, <date>]
{% endhighlight %}

Each element that is set to -1 is treated as a wildcard. The month element is
zero based. (0=January ... 11=December)

**Example** (December Holiday Seson, Every Year)
{% highlight json %}
[[-1,0,1], [-1,11,31], [-1,11,25], [-1,11,24]]
{% endhighlight %}

