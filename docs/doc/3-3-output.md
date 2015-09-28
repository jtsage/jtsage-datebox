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

# Date Format Options

The date format follows the POSIX standards.  There is one extension.  By default, all numbers are zero-padded. (see modifiers section)

<div>		
<ul data-role="listview" data-inset="true" class="options" data-divider-theme="b" data-count-theme="b">
	<li data-role="list-divider">Implemented Options</li>
	<li><h2>%%</h2>
		<span class="ui-li-count">String</span>
		<p>A Literal '%'</p>
	</li>
	<li><h2>%a</h2>
		<span class="ui-li-count">String</span>
		<p>Abreviated name of day</p>
	</li>
	<li><h2>%A</h2>
		<span class="ui-li-count">String</span>
		<p>Full name of day</p>
	</li>
	<li><h2>%b</h2>
		<span class="ui-li-count">String</span>
		<p>Abreviated name of month</p>
	</li>
	<li><h2>%B</h2>
		<span class="ui-li-count">String</span>
		<p>Full name of Month</p>
	</li>
	<li><h2>%C</h2>
		<span class="ui-li-count">Number</span>
		<p>Centruy (First 2 digits of year)</p>
	</li>
	<li><h2>%d</h2>
		<span class="ui-li-count">Number</span>
		<p>Day of month</p>
	</li>
	<li><h2>%E</h2>
		<span class="ui-li-count">Number</span>
		<p>Year of the Buddhist Era (Nominally Year + 543).  Note, this may be wrong pre-1940CE</p>
	</li>
	<li><h2>%G</h2>
	<span class="ui-li-count">Number</span>
		<p>The ISO 8601 week-based year (see NOTES) with century as a decimal number. The 4-digit year corresponding to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead. (TZ)</p>
	</li>
	<li><h2>%g</h2>
		<span class="ui-li-count">Number</span>
		<p>Like %G, but without century, that is, with a 2-digit year (00-99). (TZ)</p>
	</li>
	<li><h2>%H</h2>
		<span class="ui-li-count">Number</span>
		<p>Hour of day (01..23)</p>
	</li>
	<li><h2>%I</h2>
		<span class="ui-li-count">Number</span>
		<p>Hour of day (01..12)</p>
	</li>
	<li><h2>%j</h2>
		<span class="ui-li-count">Number</span>
		<p>The day of the year as a decimal number (range 001 to 366).</p>
	</li>
	<li><h2>%k</h2>
		<span class="ui-li-count">Number</span>
		<p>Hour of day (01..23)</p>
	</li>
	<li><h2>%l</h2>
		<span class="ui-li-count">Number</span>
		<p>Hour of day (01..12)</p>
	</li>
	<li><h2>%m</h2>
		<span class="ui-li-count">Number</span>
		<p>Month of year (01..12)</p>
	</li>
	<li><h2>%M</h2>
		<span class="ui-li-count">Number</span>
		<p>Minutes (01..59)</p>
	</li>
	<li><h2>%p</h2>
		<span class="ui-li-count">String</span>
		<p>Meridian Letters (AM/PM) in uppercase</p>
	</li>
	<li><h2>%P</h2>
		<span class="ui-li-count">String</span>
		<p>Meridian Letters (AM/PM) in lowercase</p>
	</li>
	<li><h2>%s</h2>
		<span class="ui-li-count">Number</span>
		<p>The number of seconds since the Epoch, 1970-01-01 00:00:00.</p>
	</li>
	<li><h2>%S</h2>
		<span class="ui-li-count">Number</span>
		<p>Seconds (00..59)</p>
	</li>
	<li><h2>%u</h2>
		<span class="ui-li-count">Number</span>
		<p>The day of the week (1-7), 1 = Sunday</p>
	</li>
	<li><h2>%U</h2>
		<span class="ui-li-count">Number</span>
		<p>The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also %V and %W.</p>
	</li>
	<li><h2>%V</h2>
		<span class="ui-li-count">Number</span>
		<p>The ISO 8601 week number of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.</p>
	</li>
	<li><h2>%w</h2>
		<span class="ui-li-count">Number</span>
		<p>Day of week (0-7), 0 = Sunday</p>
	</li>
	<li><h2>%W</h2>
		<span class="ui-li-count">Number</span>
		<p>The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01.</p>
	</li>
	<li><h2>%y</h2>
		<span class="ui-li-count">Number</span>
		<p>Year (00-99) (2 Digit)</p>
	</li>
	<li><h2>%Y</h2>
		<span class="ui-li-count">Number</span>
		<p>Full Year (4 Digit)</p>
	</li>
	<li data-role="list-divider">Extension Options</li>
	<li><h2>%o</h2>
		<span class="ui-li-count">String</span>
		<p>Date ordinal (st / nd / rd / th)</p>
	</li>
	<li><h2>%J</h2>
		<span class="ui-li-count">String</span>
		<p>toJSON() Date Method output. Can only be read for parseing when it is all alone.</p>
	</li>
	<li><h2>%Dd</h2>
		<span class="ui-li-count">Number</span>
		<p>Duration Days</p>
	</li>
	<li><h2>%Dl</h2>
		<span class="ui-li-count">Number</span>
		<p>Duration Hours</p>
	</li>
	<li><h2>%DM</h2>
		<span class="ui-li-count">Number</span>
		<p>Duration Minutes</p>
	</li>
	<li><h2>%DS</h2>
		<span class="ui-li-count">Number</span>
		<p>Duration Seconds</p>
	</li>
	<li><h2>%DA</h2>
		<span class="ui-li-count">String</span>
		<p>Duration Days text - e.g. Day or Days</p>
	</li>
	<li data-role="list-divider">Modifiers</li>
	<li><h2>0</h2>
		<p>Pad with zeros (the default) - e.g. 4 -> %0d -> 04 </p>
	</li>
	<li><h2>-</h2>
		<p>Pad with nothing - e.g. 4 -> %-d -> 4 </p>
	</li>
	<li><h2>X</h2>
		<p>Pass to custom formatter (custombox / customflip)</p>
	</li>
	<li data-role="list-divider">Unimplemented Options</li>
	<li><h2>%c, %D, %F, %r, %R, %T, %x, %X, %+</h2>
		<p>These options all deal with "standard" full formats - which is the point of this package</p>
	</li>
	<li><h2>%n, %t</h2>
		<p>Formatting options that make no sense in an HTML world</p>
	</li>
	<li><h2>%z, %Z</h2>
		<p>Time zone options that are better handled server-side</p>
	</li>
</ul>
</div>
