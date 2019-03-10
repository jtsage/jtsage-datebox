## Date and Time Limits

The reason many people choose to use DateBox over the other available options is that it includes a massive amount of data limiting controls. You are able to specify exactly what is valid data through the control - of course, you should still verify data on your end, but for the normal user, this will prevent them from submitting bad data through ignorance.

Data limiting works in a number of ways - there are options to disallow individual dates, individual days (such as weekends), recurring dates, or even limit to just a set of specifically good data. Similar options are available for time entry. Additionally options exist to jump to known good dates, and to highlight preferred dates or days as needed.

### Precedence

Precedence is simple.  A Date or Time is considered valid unless (in this order):

 * ___enableDates___ is specified, and the date does not appear in it.
 * It fails any of the limit checks, in a pile on order, unless is specically appears in ___whiteDates___ (which is checked prior to the limit checks)

### Caveats

All limit checks are run on every date and every time, if they are set.  So, setting a date limit for a time mode will often produce unusual results.

### Limit Options

The below list are all of the limiting options available in DateBox

{{run:apiGen.getCatLimits}}
