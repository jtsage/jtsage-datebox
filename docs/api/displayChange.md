---
title: displayChange
short: Listener - Calendar Display Date has been changed
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: event
etype: "Listener"
---

This trigger is received when the calendar display is changed - but only if the "selected" date is 
not in the visible natural month. (If the date is still "visible", but in the previous or next month, 
this event will still fire)

This trigger *precedes* the {% api_doc offset %} event, however it is
triggered in the same block of code.  It is *only* triggered if there is a 
saved selection.


{% highlight js %}
$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'displayChange' ) {
    alert('New Date Shown: ' + passed.shownDate);
    alert('Date Selected: ' + passed.selectedDate);
    alert('Change Type: ' + passed.thisChange);
    alert('Change amount: ' + passed.thisChangeAmount);
  }
});
{% endhighlight %}

### Arguments Recieved

 - **shownDate** : JavaScript Date() object of the new date shown
 - **selectedDate** : JavaScript Date() object currently user-selected
 - **thisChange** : Field Changed
   - *y* - Year
   - *m* - Month
   - *d* - Date
   - *h* - Hour
   - *i* - Minute
   - *s* - Second
   - *a* - Meridiem
   - *p* - Special Case - offset changed by the picker controls (month/year)
 - **thisChangeAmount**: Amount of change, +/- (or, in the case of thisChange === "p", it will be null)

