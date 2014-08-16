---
title: durationStep
short: Stepper for the least precise duration element
modes: [
	'durationbox',
	'durationflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "1"
dattype: "Integer"
dyn: "True"
---

This will set the stepper for the *most* precise time measurment shown in your
duration control.  By default, this is seconds - however, if you play with 
{% api_doc durationFieldOrder %}, it could be any field up to and including days.

Example:

{% highlight js %}
overrideDurationFieldOrder = ['d','h'];
{% endhighlight %}

In this case, "hours" would be stepped, as it is the least precise element shown.
