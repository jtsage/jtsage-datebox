## Default and Starting Values

Setting the default is simple - you can simply set the input element - however, this is risky, as it must be in the exact same format that datebox will output. Better is to use the option ___defaultValue___

### defaultValue

Set the default date value, or time value.  Many options exist for supplying the date:

##### Date Modes:

```js
defaultValue: new Date(2001,0,1,0,0,0,0); // Date Object (Jan 1, 2001)
defaultValue: [2001,0,1];   // Array (Jan 1, 2001)
defaultValue: "2001-01-01"; // ISO Date String (Jan 1, 2001)
defaultValue: 978307200;    // Number (Epoch) (Jan 1, 2001 GMT !SEE NOTE1!)
```

##### Time Modes:

```js
defaultValue: new Date(2001,0,1,15,30,0,0); // Date Object (3:30:00 PM)
defaultValue: [15,30,0];  // Array (3:30:00 PM)
defaultValue: "15:30";    // String (3:30:00 PM)
defaultValue: "15:30:00"; // String with Seconds (3:30:00 PM)
defaultValue: 55800;      // Number (Epoch) (3:30:00 PM GMT, !SEE NOTE1!)
```

##### Duration Modes:

```js
defaultValue: 3600; // Number of seconds (60 Minutes)
```

#### Note 0: Be Specific!

When choosing a format to use, be as specific as your data will allow you to be.  A Date object is a date object - it's inturpreted on the client maching, and it will be "right".  Failing that, the array constructor just passes those values on to a new Date().  Use the string constructor as a last resort - even a simple typo in the string format will cause the defaultValue parser to fail, which drops the defaultValue === Today's Date, NOW().

#### Note 1: Don't Use Epoch!

A small note about epoch - great pains have been made to make DateBox rather timezone agnostic.  It *rarely* has to care, and when it does, it tends to fail pretty much silently. (a/n: This really only crops up for people who observe DST, and then, it will only show up in time modes, or duration modes if you are working with large numbers).  That said, if you supply epoch, it is *not* based on UTC, but the local timezone. If you have already done the math serverside, great.  If not, and you absolutly must store your dates this way, a good way to convert back is:

```js
myDate = new Date();
myDate.setUTCSeconds( epoch );
```

#### Note 2: Re-using defaultValue

___defaultValue___ is only read when the input element is *empty*.  If you need to change the date, ___setTheDate()___ is much more effective.


### Start offsets

If for some reason you need to translate based off of the default value - perhaps your default is a flight departure date, and you wish to guess that the user will return a week after that, you can use:

 * ___startOffsetYears___ : Offset defaultValue by # years
 * ___startOffsetMonths___ : Offset defaultValue by # months
 * ___startOffsetDays___ : Offset defaultValue by # days
 
Note these will be applied to “today” if the input element is empty as well. (for instance, if you want the control to start one year from today, just set ‘startOffsetYears’ to 1)