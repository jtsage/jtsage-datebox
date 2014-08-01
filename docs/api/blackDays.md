---
title: blackDays
short: List of days to disallow
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Array"
dyn: "True"
---

Zero based array of days (0=Sunday ... 6=Saturday) that are not valid and 
should be disabled. Specific dates can be re-enabled via {% api_doc whiteDates %}.


**Example** (No Weekends)
{% highlight json %}
[0,6]
{% endhighlight %}

