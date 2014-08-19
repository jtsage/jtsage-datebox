---
title: destroy
short: Destroy the datebox
modes: [
]
cats: [ 'public' ]
relat: "public"
layout: func
rettype: "jQuery Object (datebox input element)"
etype: "Listener"
---

## As a Function

This function will destroy the datebox control and remove the enhancements it added.

Note that the input will still be styled with textinput(), so if you want back to original
HTML from your source file, you'll need to destroy that as well.

{% highlight js %}
$(input).datebox('destroy');
{% endhighlight %}
