---
title: setTheDate
short: Set the date
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
rettype: "jQuery Object (datebox input element)"
---

This will set the date, with two options of passed argument:

 - *Date Object* : JavaScript Date() object
 - *Formatted String* : String, formatted in the same format that DateBox is currently outputting.

{% highlight js %}
$(input).datebox('setTheDate', <Date Object>);
$(input).datebox('setTheDate', <Formatted String>);
{% endhighlight %}
