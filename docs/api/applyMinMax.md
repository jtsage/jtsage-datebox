---
title: applyMinMax
short: Apply min/max HTML attributes
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
rettype: "jQuery Object (datebox input element)"
defval: ""
dattype: ""
---

{% highlight js %}
$(input).datebox('applyMinMax');
{% endhighlight %}

DateBox does not "watch" the min/max HTML attributes, other than on widget initilization.
If you manually change them via JavaScript, you will need to run this function to
make sure the DateBox "sees" them.
