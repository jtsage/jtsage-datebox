---
title: blackDatesRec
short: List of recurring dates to be disallowed
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

Array of arrays of dates that are not valid and should be disabled. Dates can be 
re-enabled via {% api_doc whiteDates %} or by removeing from this array. Each 
inner array is in the format:

{% highlight json %}
[<year>, <month>, <date>]
{% endhighlight %}

Each element that is set to -1 is treated as a wildcard. The month element is
zero based. (0=January ... 11=December)

**Example** (December Holiday Seson, Every Year)
{% highlight json %}
[[-1,0,1], [-1,11,31], [-1,11,25], [-1,11,24]]
{% endhighlight %}
