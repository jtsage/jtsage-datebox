---
title: runOnBlurCallback
short: Callback function to run on original input box change (blur / change)
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'customflip',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "false"
dattype: "Function"
dyn: "True"
---

This option can only be supplied as a function.  It will recieve an object containing:

 * oldDate - the Date that existed prior to the control closing.  Usually, this is the last good date.
 * newDate - should the input be re-read, this is the date the control thinks it is.
 * wasGoodDate - the input can be succesfully processed
 * wasBadDate - the input can NOT be succesfully processed

The function *must* return an object with 2 properties:

 * didSomething - the function performed in some manner, and the below newDate should be used
 * newDate - a **string** of the new date, in the correct output format.  Not a date object.
 
For more information, please see: [Callbacks / Listeners]({{site.basesite}}doc/6-1-callback/).



