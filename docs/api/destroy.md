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

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">
As a Function
</h3></div>
<div class="panel-body">
This function will destroy the DateBox control and remove the enhancements it added.

Note that the input will still be styled with textinput() [jqm only], so if you want back to original
HTML from your source file, you'll need to destroy that as well.

{% highlight js %}
$(input).datebox('destroy');
{% endhighlight %}

</div></div>
