---
title: Conversion Library
pagenum: 25
layout: doc
---

# Using DateBox as a Conversion Library

DateBox can be used as a conversion library if you wish. This is accomplished with a pair of 
functions that use some of the internal bits of DateBox.

## Pre-Requisite
This needs to be done with a valid DateBox on the page somewhere - it need not be visible (put it 
in a hidden div), but it must be a valid, working DateBox (of any DATE type - DURATION modes will
not parse correctly)

## Reading a Date
To read a date into the JavaScript date format for further use, use the {% api_doc parseDate %} function:

{% highlight js %}

var myDate = $( "#datebox_input" ).datebox( "parseDate", "%Y-%m-%d", "2001-01-01" );
// Returns: Mon Jan 01 2001 00:00:00 GMT-0500 (EST)

{% endhighlight %}

## Outputting a Date
To then convert the date to your perfered output format, feed it back into {% api_doc callFormat %}:

{% highlight js %}

var myOutput = $( "#datebox_input" ).datebox( "callFormat", "%A, %B %-d%o, %Y", myDate );
// Returns: "Monday, January 1st, 2001"

{% endhighlight %}

## Notes
Of course, the first function yields a basic JavaScript date object - note that this can be used as 
input for a number of things, not the least of which is DateBox defaults.

