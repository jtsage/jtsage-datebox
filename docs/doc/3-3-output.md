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
			<div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">Filter:</span>
				</div>
			<input type="text" id="filterman" class="form-control">
			<div class="input-group-append">
				<button id="filtermanbtn" class="btn btn-outline-secondary" type="button" id="button-addon2">Limit!</button>
				 </div>
		</div>
	</div>
</div>

## Standard Operators
<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%%
		</h5></div><div class="card-body">
		A Literal '%'
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%a
		</h5></div><div class="card-body">
		Abbreviated Name of Day
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%A
		</h5></div><div class="card-body">
		Full Name of Day
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%b
		</h5></div><div class="card-body">
		Abbreviated Name of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%B
		</h5></div><div class="card-body">
		Full Name of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%C
		</h5></div><div class="card-body">
		Century (First 2 digits of a modern year)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%d
		</h5></div><div class="card-body">
		Day of Month
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%E
		</h5></div><div class="card-body">
		Year of the Buddhist Era (Nominally Year + 543).  Note, this may be wrong pre-1940CE
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%G
		</h5></div><div class="card-body">
		The ISO 8601 week-based year with century as a decimal number. The 4-digit year corresponding to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead.
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%g
		</h5></div><div class="card-body">
		Like %G, but without century, that is, with a 2-digit year (00-99).
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%H
		</h5></div><div class="card-body">
		24-Hour, Hour of day (01..23)
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%I
		</h5></div><div class="card-body">
		12-Hour, Hour of day (01..12)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%j
		</h5></div><div class="card-body">
		The day of the year as a decimal number (range 001 to 366).
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%k
		</h5></div><div class="card-body">
		24-Hour, Hour of day (01..23) (Alias of %H)
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%l
		</h5></div><div class="card-body">
		12-Hour, Hour of day (01..12) (Alias of %I)
	</div></div></div>
</div>


<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%m
		</h5></div><div class="card-body">
		Month of year (01..12)
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%M
		</h5></div><div class="card-body">
		Minute of the hour (00..59)
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%p
		</h5></div><div class="card-body">
		Meridian Letters (AM/PM) in uppercase
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%P
		</h5></div><div class="card-body">
		Meridian Letters (AM/PM) in lowercase
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%s
		</h5></div><div class="card-body">
		The number of seconds since the Epoch, 1970-01-01 00:00:00, in the local timezone
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%S
		</h5></div><div class="card-body">
		Seconds (00..59)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%u
		</h5></div><div class="card-body">
		The numeric day of the week (1-7), 1 = Sunday
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%U
		</h5></div><div class="card-body">
		The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also %V and %W.
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%V
		</h5></div><div class="card-body">
		The ISO 8601 week number of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%w
		</h5></div><div class="card-body">
		The numeric day of the week (0-6), 0 = Sunday
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%W
		</h5></div><div class="card-body">
		The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01.
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%y
		</h5></div><div class="card-body">
		Year (00-99) (2 Digit)
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%Y
		</h5></div><div class="card-body">
		Full Year (4 Digit)
	</div></div></div>
</div>

## Extension Operators

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%o
		</h5></div><div class="card-body">
		Date ordinal ( st / nd / rd / th )
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%J
		</h5></div><div class="card-body">
		toJSON() JavaScript Date Method output.  Can be read in a parser only when it is alone.
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%Dd
		</h5></div><div class="card-body">
		Duration Days
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%Dl
		</h5></div><div class="card-body">
		Duration Hours (lowercase L)
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%DM
		</h5></div><div class="card-body">
		Duration Minutes
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-info pull-right">
		Number
		</span><h5>
		%DS
		</h5></div><div class="card-body">
		Duration Seconds
	</div></div></div>
</div>

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-primary pull-right">
		String
		</span><h5>
		%DA
		</h5></div><div class="card-body">
		Duration Days text - e.g. Day or Days
	</div></div></div>
</div>

## Modifiers

<div class="row">
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-success pull-right">
		Modifier
		</span><h5>
		0
		</h5></div><div class="card-body">
		Pad with zeros (the default) - e.g. 4 -> %0d -> 04 
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-success pull-right">
		Modifier
		</span><h5>
		-
		</h5></div><div class="card-body">
		Pad with nothing - e.g. 4 -> %-d -> 4
	</div></div></div>
	<div class="col-sm-4">
		<div class="card mb-3"><div class="card-header"><span class="label label-success pull-right">
		Modifier
		</span><h5>
		X
		</h5></div><div class="card-body">
		Pass to custom formatter (custombox / customflip) e.g. %XA -> send 'A' to customflip.
	</div></div></div>
</div>

