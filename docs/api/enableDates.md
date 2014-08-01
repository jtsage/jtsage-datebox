---
title: enableDates
short: List of exclusive ISO dates to be selected
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

Array of ISO dates that are exclusivly valid and all others should be disabled. Dates
can be re-enabled via {% api_doc whiteDates %} or by removeing from this array.


**Example** (Only December 2000 Holiday Seson)
{% highlight json %}
["2001-01-01", "2000-12-31", "2000-12-25", "2000-12-24"]
{% endhighlight %}






