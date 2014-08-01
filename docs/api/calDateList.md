---
title: calDateList
short: List of dates for Date List Picker
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

Array of 2-element arrays to show in a special pick list.  Used with {% api_doc calShowDateList %}.
Inner array structure is:

{% highlight json %}
[ISO-Date, Description]
{% endhighlight %}

**Example**
{% highlight json %}
[["1980-04-25", "JT's Date of Birth"], ["1809-02-12", "Lincoln's Birthday"]]
{% endhighlight %}
