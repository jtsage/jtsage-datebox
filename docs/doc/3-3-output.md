---
title: Output Formats
pagenum: 6
layout: doc
---

# Reminder about Overrides
When using the override system, note the use of camel case - i.e. "dateFormat" becomes "overrideDateFormat"

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox","overrideDateFormat":"%A, %B %-d, %Y"}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="outtie">Changed Output</label>
	<input id="outtie" type="text" data-role="datebox" data-options='{"mode":"calbox","overrideDateFormat":"%A, %B %-d, %Y", "useInline":true}'>
</div>

<style type="text/css">
	.options h3 { display: inline; }
	.options p { margin-top: .3em; margin-left: 2em;}
	.options li p.desc { font-size: .9em; margin-left: .6em; }
	.options pre { font-weight: normal; }
	dl.option dt { display: inline; width: 60px; margin-left: 30px; }
	dl.option dd { display: inline-block; width: 100px; font-style: italic; margin-left: 10px;}
	dl.option { float: right; clear: right; margin-top: -1em;}
	p code { font-size:1.2em; font-weight:bold; } 
	dt { font-weight: bold; margin: 2em 0 .5em; }
	dt code, dd code { font-size:1.3em; line-height:150%; }
	pre { white-space: pre; white-space: pre-wrap; word-wrap: break-word; }
</style>

# Date Format Options

The date format follows the POSIX standards.  There is one extension.  By default, all numbers are zero-padded. (see modifiers section)

<div>		
<ul data-role="listview" data-inset="true" class="options" data-divider-theme="b">
	<li data-role="list-divider">Implemented Options</li>
	<li><h3>%%</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">A Literal '%'</p>
	</li>
	<li><h3>%a</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Abreviated name of day</p>
	</li>
	<li><h3>%A</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Full name of day</p>
	</li>
	<li><h3>%b</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Abreviated name of month</p>
	</li>
	<li><h3>%B</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Full name of Month</p>
	</li>
	<li><h3>%C</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Centruy (First 2 digits of year)</p>
	</li>
	<li><h3>%d</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Day of month</p>
	</li>
	<li><h3>%E</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Year of the Buddhist Era (Nominally Year + 543).  Note, this may be wrong pre-1940CE</p>
	</li>
	<li><h3>%G</h3>
	<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The ISO 8601 week-based year (see NOTES) with century as a decimal number. The 4-digit year corresponding to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead. (TZ)</p>
	</li>
	<li><h3>%g</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Like %G, but without century, that is, with a 2-digit year (00-99). (TZ)</p>
	</li>
	<li><h3>%H</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Hour of day (01..23)</p>
	</li>
	<li><h3>%I</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Hour of day (01..12)</p>
	</li>
	<li><h3>%j</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The day of the year as a decimal number (range 001 to 366).</p>
	</li>
	<li><h3>%k</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Hour of day (01..23)</p>
	</li>
	<li><h3>%l</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Hour of day (01..12)</p>
	</li>
	<li><h3>%m</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Month of year (01..12)</p>
	</li>
	<li><h3>%M</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Minutes (01..59)</p>
	</li>
	<li><h3>%p</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Meridian Letters (AM/PM) in uppercase</p>
	</li>
	<li><h3>%P</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Meridian Letters (AM/PM) in lowercase</p>
	</li>
	<li><h3>%s</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The number of seconds since the Epoch, 1970-01-01 00:00:00.</p>
	</li>
	<li><h3>%S</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Seconds (00..59)</p>
	</li>
	<li><h3>%u</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The day of the week (1-7), 1 = Sunday</p>
	</li>
	<li><h3>%U</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also %V and %W.</p>
	</li>
	<li><h3>%V</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The ISO 8601 week number of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.</p>
	</li>
	<li><h3>%w</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Day of week (0-7), 0 = Sunday</p>
	</li>
	<li><h3>%W</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01.</p>
	</li>
	<li><h3>%y</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Year (00-99) (2 Digit)</p>
	</li>
	<li><h3>%Y</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Full Year (4 Digit)</p>
	</li>
	<li data-role="list-divider">Extension Options</li>
	<li><h3>%o</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Date ordinal (st / nd / rd / th)</p>
	</li>
	<li><h3>%Dd</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Duration Days</p>
	</li>
	<li><h3>%Dl</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Duration Hours</p>
	</li>
	<li><h3>%DM</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Duration Minutes</p>
	</li>
	<li><h3>%DS</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>Number</dd></dl>
		<p class="desc">Duration Seconds</p>
	</li>
	<li><h3>%DA</h3>
		<dl data-role="none" class="option"><dt>Type:</dt><dd>String</dd></dl>
		<p class="desc">Duration Days text - e.g. Day or Days</p>
	</li>
	<li data-role="list-divider">Modifiers</li>
	<li><h3>0</h3>
		<p class="desc">Pad with zeros (the default) - e.g. 4 -> %0d -> 04 </p>
	</li>
	<li><h3>-</h3>
		<p class="desc">Pad with nothing - e.g. 4 -> %-d -> 4 </p>
	</li>
	<li><h3>X</h3>
		<p class="desc">Pass to custom formatter (custombox / customflip)</p>
	</li>
	<li data-role="list-divider">Unimplemented Options</li>
	<li><h3>%c, %D, %F, %r, %R, %T, %x, %X, %+</h3>
		<p>These options all deal with "standard" full formats - which is the point of this package</p>
	</li>
	<li><h3>%n, %t</h3>
		<p>Formatting options that make no sense in an HTML world</p>
	</li>
	<li><h3>%z, %Z</h3>
		<p>Time zone options that are better handled server-side</p>
	</li>
</ul>
</div>
