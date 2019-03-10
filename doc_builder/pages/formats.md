## Output Formats

DateBox can output in just about any known format. If you choose something really esoteric, be sure to check out ___linkedInput___ to ease sending your data to the backend.

### Reminder about Overrides
When using the override system, note the use of camel case - i.e.

 * ___dateFormat___ _->_ __overrideDateFormat__

```html
<input type="text" data-role="datebox" data-options='{ "mode": "calbox", "overrideDateFormat": "%A, %B %-d, %Y" }'>
```

### Date Format Operators

The date format follows the POSIX standards.  There are two non-standard extensions, and 5 extensions for use with duration modes.  By default, all numbers are zero-padded. (see modifiers section)

#### Standard Operators

 * __%%__ : A Literal '%'
 * __%a__ : Abbreviated Name of Day
 * __%A__ : Full Name of Day
 * __%b__ : Abbreviated Name of Month
 * __%B__ : Full Name of Month
 * __%C__ : Century (First 2 digits of a modern year)
 * __%d__ : Day of Month
 * __%E__ : Year of the Buddhist Era (Nominally Year + 543).  Note, this may be wrong pre-1940CE
 * __%G__ : The ISO 8601 week-based year with century as a decimal number. The 4-digit year corresponding to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead.
 * __%g__ : Like %G, but without century, that is, with a 2-digit year (00-99).
 * __%H__ : 24-Hour, Hour of day (01..23)
 * __%I__ : 12-Hour, Hour of day (01..12)
 * __%j__ : The day of the year as a decimal number (range 001 to 366).
 * __%k__ : 24-Hour, Hour of day (01..23) (Alias of %H)
 * __%l__ : 12-Hour, Hour of day (01..12) (Alias of %I)
 * __%m__ : Month of year (01..12)
 * __%M__ : Minute of the hour (00..59)
 * __%p__ : Meridian Letters (AM/PM) in uppercase
 * __%P__ : Meridian Letters (AM/PM) in lowercase
 * __%s__ : The number of seconds since the Epoch, 1970-01-01 00:00:00, in the local timezone
 * __%S__ : Seconds (00..59)
 * __%u__ : The numeric day of the week (1-7), 1 = Sunday
 * __%U__ : The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also %V and %W.
 * __%V__ : The ISO 8601 week number of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.
 * __%w__ : The numeric day of the week (0-6), 0 = Sunday
 * __%W__ : The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01.
 * __%y__ : Year (00-99) (2 Digit)
 * __%Y__ : Full Year (4 Digit)


#### Extension Operators

 * __%o__ : Date ordinal ( st / nd / rd / th )
 * __%J__ : toJSON() JavaScript Date Method output.  Can be read in a parser only when it is alone.
 * __%Dd__ : Duration Days
 * __%Dl__ : Duration Hours (lowercase L)
 * __%DM__ : Duration Minutes
 * __%DS__ : Duration Seconds
 * __%DA__ : Duration Days text - e.g. Day or Days


#### Modifiers

 * __0__ : Pad with zeros (the default) - e.g. 4 -> %0d -> 04 
 * __-__ : Pad with nothing - e.g. 4 -> %-d -> 4
