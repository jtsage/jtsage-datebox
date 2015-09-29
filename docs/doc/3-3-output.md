---
title: Output Formats
pagenum: 6
layout: doc
---

# Reminder about Overrides
<div class="alert alert-warning">
When using the override system, note the use of camel case - i.e. {% api_doc dateFormat %} becomes "overrideDateFormat"
</div>

{% highlight html %}
<input type="text" data-role="datebox" data-options='{ "mode": "calbox", "overrideDateFormat": "%A, %B %-d, %Y" }'>
{% endhighlight %}

<div class="form-group">
	<label for="outtie">Changed Output</label>
	<input id="outtie" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox","overrideDateFormat":"%A, %B %-d, %Y","useInlineAlign":"center","useInline":true}'>
</div>

# Date Format Operators

The date format follows the POSIX standards.  There are two non-standard extensions, and 5 extensions for use
with duration modes.  By default, all numbers are zero-padded. (see modifiers section)

<div class="filter">
	<div class="form-group">
		<div class="input-group">
			<span class="input-group-addon">Filter:</span>
			<input type="text" id="filterman2" class="form-control">
			<span class="input-group-btn">
				<button id="filterman2btn" class="btn btn-default" type="button">Limit!</button>
			</span>
		</div>
	</div>
</div>

## Standard Operators
<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%%
		</h3></div><div class="panel-body">
		A Literal '%'
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%a
		</h3></div><div class="panel-body">
		Abbreviated Name of Day
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%A
		</h3></div><div class="panel-body">
		Full Name of Day
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%b
		</h3></div><div class="panel-body">
		Abbreviated Name of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%B
		</h3></div><div class="panel-body">
		Full Name of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%C
		</h3></div><div class="panel-body">
		Century (First 2 digits of a modern year)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%d
		</h3></div><div class="panel-body">
		Day of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%E
		</h3></div><div class="panel-body">
		Year of the Buddhist Era (Nominally Year + 543).  Note, this may be wrong pre-1940CE
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%G
		</h3></div><div class="panel-body">
		The ISO 8601 week-based year with century as a decimal number. The 4-digit year corresponding to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead.
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%g
		</h3></div><div class="panel-body">
		Like %G, but without century, that is, with a 2-digit year (00-99).
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%H
		</h3></div><div class="panel-body">
		24-Hour, Hour of day (01..23)
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%I
		</h3></div><div class="panel-body">
		12-Hour, Hour of day (01..12)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%j
		</h3></div><div class="panel-body">
		The day of the year as a decimal number (range 001 to 366).
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%k
		</h3></div><div class="panel-body">
		24-Hour, Hour of day (01..23) (Alias of %H)
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%l
		</h3></div><div class="panel-body">
		12-Hour, Hour of day (01..12) (Alias of %I)
	</div></div></div>
</div>


<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%m
		</h3></div><div class="panel-body">
		Month of year (01..12)
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%M
		</h3></div><div class="panel-body">
		Minute of the hour (00..59)
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%p
		</h3></div><div class="panel-body">
		Meridian Letters (AM/PM) in uppercase
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%P
		</h3></div><div class="panel-body">
		Meridian Letters (AM/PM) in lowercase
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%s
		</h3></div><div class="panel-body">
		The number of seconds since the Epoch, 1970-01-01 00:00:00, in the local timezone
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%S
		</h3></div><div class="panel-body">
		Seconds (00..59)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%u
		</h3></div><div class="panel-body">
		The numeric day of the week (1-7), 1 = Sunday
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%U
		</h3></div><div class="panel-body">
		The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also %V and %W.
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%V
		</h3></div><div class="panel-body">
		The ISO 8601 week number of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%w
		</h3></div><div class="panel-body">
		The numeric day of the week (0-6), 0 = Sunday
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%W
		</h3></div><div class="panel-body">
		The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01.
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%y
		</h3></div><div class="panel-body">
		Year (00-99) (2 Digit)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%Y
		</h3></div><div class="panel-body">
		Full Year (4 Digit)
	</div></div></div>
</div>

## Extension Operators

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%o
		</h3></div><div class="panel-body">
		Date ordinal ( st / nd / rd / th )
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%J
		</h3></div><div class="panel-body">
		toJSON() JavaScript Date Method output.  Can be read in a parser only when it is alone.
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%Dd
		</h3></div><div class="panel-body">
		Duration Days
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%Dl
		</h3></div><div class="panel-body">
		Duration Days
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%DM
		</h3></div><div class="panel-body">
		Duration Minutes
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-info pull-right">
		Number
		</span><h3 class="panel-title">
		%DS
		</h3></div><div class="panel-body">
		Duration Seconds
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-primary pull-right">
		String
		</span><h3 class="panel-title">
		%DA
		</h3></div><div class="panel-body">
		Duration Days text - e.g. Day or Days
	</div></div></div>
</div>

## Modifiers

<div class="row">
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-success pull-right">
		Modifier
		</span><h3 class="panel-title">
		0
		</h3></div><div class="panel-body">
		Pad with zeros (the default) - e.g. 4 -> %0d -> 04 
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-success pull-right">
		Modifier
		</span><h3 class="panel-title">
		-
		</h3></div><div class="panel-body">
		Pad with nothing - e.g. 4 -> %-d -> 4
	</div></div></div>
	<div class="col-sm-4">
		<div class="panel panel-default"><div class="panel-heading"><span class="label label-success pull-right">
		Modifier
		</span><h3 class="panel-title">
		X
		</h3></div><div class="panel-body">
		Pass to custom formatter (custombox / customflip) e.g. %XA -> send 'A' to customflip.
	</div></div></div>
</div>

