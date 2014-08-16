---
title: durationSteppers
short: Steppers for the duration elements
modes: [
	'durationbox',
	'durationflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "{'d': 1, 'h': 1, 'i': 1, 's': 1}"
dattype: "Object"
dyn: "True"
---

DO NOT USE THIS DIRECTLY - USE {% api_doc durationStep %} INSTEAD!

Controls the amount of offset on each element of a duration control. 

 - **d** : Days
 - **h** : Hours
 - **i** : Minutes
 - **s** : Seconds

This is normalized so only your least precise displayed measurement can be stepped.

Take this example - duration stepper of 2 on hours, current duration is:

     0 Days, 02:00:00

Now, your user hits minus (or scrolls) 1 less minute or second.  What should happen?
