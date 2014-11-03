/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

/* QUnit Tests */

QUnit.module( "Date() Enhancement Tests" );

QUnit.test(".get() Test", function( assert ){
	var date = new Date(2001,1,2,12,30,55,0);

	expect( 6 );

	assert.equal( date.get(0), date.getFullYear(), "Full Year");
	assert.equal( date.get(1), date.getMonth(), "Month");
	assert.equal( date.get(2), date.getDate(), "Date");
	assert.equal( date.get(3), date.getHours(), "Hours");
	assert.equal( date.get(4), date.getMinutes(), "Minutes");
	assert.equal( date.get(5), date.getSeconds(), "Seconds");
});

QUnit.test(".get12hr() Test", function( assert ){
	var date;

	expect( 4 );

	date = new Date(2001,0,1,0,0,0,0);
	assert.equal( date.get12hr(), 12, "Midnight");

	date = new Date(2001,0,1,6,0,0,0,0);
	assert.equal( date.get12hr(), 6, "6am");

	date = new Date(2001,0,1,12,0,0,0,0);
	assert.equal( date.get12hr(), 12, "Noon");

	date = new Date(2001,0,1,18,0,0,0,0);
	assert.equal( date.get12hr(), 6, "6pm");
});

QUnit.test(".iso() Test", function( assert ){
	var date = new Date(2001,0,1,0,0,0,0);

	assert.equal( date.iso(), "2001-01-01", "Jan 1, 2001");
});

QUnit.test(".comp() Test", function( assert ){
	var date = new Date(2001,0,1,0,0,0,0);

	assert.equal( date.comp(), 20010101, "Jan 1, 2001");
});

QUnit.test(".getArray() Test", function( assert ){
	var expect = new Array(2001,0,1,12,30,55),
		date = new Date(2001,0,1,12,30,55,0);

	assert.deepEqual( date.getArray(), expect, "Jan 1, 2001");
});

QUnit.test(".setD() Test", function( assert ){
	var date = new Date(2001,0,1,0,0,0,0);

	expect( 6 );

	date.setD(0, 2012);
	assert.deepEqual( date.getArray(), [2012,0,1,0,0,0], "Year Change");
	date.setD(1, 1);
	assert.deepEqual( date.getArray(), [2012,1,1,0,0,0], "Month Change");
	date.setD(2, 13);
	assert.deepEqual( date.getArray(), [2012,1,13,0,0,0], "Date Change");
	date.setD(3, 6);
	assert.deepEqual( date.getArray(), [2012,1,13,6,0,0], "Hour Change");
	date.setD(4, 30);
	assert.deepEqual( date.getArray(), [2012,1,13,6,30,0], "Minute Change");
	date.setD(5, 20);
	assert.deepEqual( date.getArray(), [2012,1,13,6,30,20], "Second Change");
});

QUnit.test(".adj() Test", function( assert ){
	var date = new Date(2001,1,1,10,30,10,0);

	expect( 6 );

	date.adj(0, 11);
	assert.deepEqual( date.getArray(), [2012,1,1,10,30,10], "Year Change");
	date.adj(1, 2);
	assert.deepEqual( date.getArray(), [2012,3,1,10,30,10], "Month Change");
	date.adj(2, 12);
	assert.deepEqual( date.getArray(), [2012,3,13,10,30,10], "Date Change");
	date.adj(3, 5);
	assert.deepEqual( date.getArray(), [2012,3,13,15,30,10], "Hour Change");
	date.adj(4, 15);
	assert.deepEqual( date.getArray(), [2012,3,13,15,45,10], "Minute Change");
	date.adj(5, 20);
	assert.deepEqual( date.getArray(), [2012,3,13,15,45,30], "Second Change");
});

QUnit.test(".copy() Test", function( assert ){
	var newd, date = new Date(2001,0,1,0,0,0,0);

	expect( 3 );

	newd = date.copy([1,2,3,4,5,6]);
	assert.deepEqual( newd.getArray(), [2002,2,4,4,5,6], "Adjustment Only");

	newd = date.copy([],[2012,1,3,10,20,30]);
	assert.deepEqual( newd.getArray(), [2012,1,3,10,20,30], "Override Only");

	newd = date.copy([2,0,4,0,6],[0,5,0,10,0,30]);
	assert.deepEqual( newd.getArray(), [2003,5,5,10,6,30], "Override + Adjustment");
});

QUnit.test(".setFirstDay() Test", function( assert ){
	var date = new Date(2014,0,1,0,0,0,0);

	expect( 7 );

	date.setFirstDay(0);
	assert.deepEqual( date.comp(), 20140105, "Sunday");
	date.setFirstDay(1);
	assert.deepEqual( date.comp(), 20140106, "Monday");
	date.setFirstDay(2);
	assert.deepEqual( date.comp(), 20140107, "Tuesday");
	date.setFirstDay(3);
	assert.deepEqual( date.comp(), 20140101, "Wednesday");
	date.setFirstDay(4);
	assert.deepEqual( date.comp(), 20140102, "Thursday");
	date.setFirstDay(5);
	assert.deepEqual( date.comp(), 20140103, "Friday");
	date.setFirstDay(6);
	assert.deepEqual( date.comp(), 20140104, "Saturday");
	

});

QUnit.test(".getDWeek() / .setDWeek Test", function( assert ){
	var date = new Date(2015,0,8,0,0,0,0);

	expect( 6 );

	assert.equal( date.getDWeek(4), 2, "Monday Based, Skip short Week");
	assert.equal( date.getDWeek(1), 1, "Monday Based, Jan 1 Based");
	assert.equal( date.getDWeek(0), 1, "Sunday Based, Jan 1 Based");

	date = new Date(2015,0,8,0,0,0,0);
	date.setDWeek(0,10);
	assert.deepEqual( date.getArray(), [2015,2,8,0,0,0], "Week 10, Type 0");
	date = new Date(2015,0,8,0,0,0,0);
	date.setDWeek(1,10);
	assert.deepEqual( date.getArray(), [2015,2,9,0,0,0], "Week 10, Type 1");
	date = new Date(2015,0,8,0,0,0,0);
	date.setDWeek(4,10);
	assert.deepEqual( date.getArray(), [2015,2,2,0,0,0], "Week 10, Type 4");
});


QUnit.module( "defaultValue Tests" );

QUnit.test( "Date Object Test", function( assert ){
	var db = $( "<input>").datebox({
		mode: "datebox",
		defaultValue: new Date(2001,0,1)
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2001-01-01",
		"Output should be ISO 2001-01-01 (" + db.val() + ")"
	);
});

QUnit.test( "Date Array Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "datebox",
		defaultValue: [2001,0,1]
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2001-01-01",
		"Output should be ISO 2001-01-01 (" + db.val() + ")"
	);
});

QUnit.test( "Date String Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "datebox",
		defaultValue: "2001-01-01"
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2001-01-01",
		"Output should be ISO 2001-01-01 (" + db.val() + ")"
	);
});

QUnit.test( "Date Epoch Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "datebox",
		defaultValue: 122410
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"1970-01-02",
		"Output should be ISO 1970-01-02 (" + db.val() +
			") - Note, if you are in GMT-11, this test will always fail"
	);
});

QUnit.test( "Time Object Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "timebox",
		defaultValue: new Date(2001,0,1,1,30,0,0)
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"01:30",
		"Output should be 01:30 (" + db.val() + ")"
	);
});

QUnit.test( "Time Array Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "timebox",
		defaultValue: [1,30,0]
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"01:30",
		"Output should be 01:30 (" + db.val() + ")"
	);
});

QUnit.test( "Time String Test (2 Element)", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "timebox",
		defaultValue: "1:30"
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"01:30",
		"Output should be 01:30 (" + db.val() + ")"
	);
});

QUnit.test( "Time String Test (3 Element)", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "timebox",
		defaultValue: "01:30:00"
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"01:30",
		"Output should be 01:30 (" + db.val() + ")"
	);
});

QUnit.test( "Date input.val() Test", function( assert ){
	var newDate = new Date(2001,0,1),
		db = $("<input value='2001-01-01'>").datebox({
			mode: "datebox"
		});

	assert.deepEqual(
		db.datebox( "getTheDate" ).comp(),
		newDate.comp(),
		"Expected (" + newDate.comp() + "), Got (" + 
			db.datebox( "getTheDate" ).comp() + ")"
	);	
});

QUnit.test( "Time input.val() Test", function( assert ){
	var goodDate = [1,30], gotDate,
		db = $( "<input value='01:30'>" ).datebox({
			mode: "timebox"
		});

	gotDate = db.datebox( "getTheDate" ).getArray().slice( 3 ).slice( 0, 2 );

	assert.deepEqual(
		gotDate,
		goodDate,
		"Expected (" + goodDate + "), Got (" + gotDate + ")"
	);
});

QUnit.test( "startOffsetYears Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "datebox",
		startOffsetYears: 2,
		defaultValue: new Date(2001,0,1)
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2003-01-01",
		"Output should be ISO 2003-01-01 (" + db.val() + ")"
	);
});

QUnit.test( "startOffsetMonths Test", function( assert ){
	var db = $( "<input>" ).datebox({
		mode: "datebox",
		startOffsetMonths: 2,
		defaultValue: new Date(2001,0,1)
	});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2001-03-01",
		"Output should be ISO 2001-03-01 (" + db.val() + ")"
	);
});

QUnit.test("startOffsetDays Test", function( assert ){
	var db = $( "<input>" ).datebox({
			mode: "datebox",
			startOffsetDays: 2,
			defaultValue: new Date(2001,0,1)
		});

	db.trigger( "datebox", { method: "doset" } );

	assert.equal(
		db.val(),
		"2001-01-03",
		"Output should be ISO 2001-01-03 (" + db.val() + ")"
	);
});


QUnit.module( "Limits - CalBox" );

QUnit.test( "Relative - beforeToday", function( assert ){
	var datestr,
		today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "calbox",
			beforeToday: true,
			useInline: true
		});

	datestr = today.get(2) + 1;

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(" + datestr + ")" )
		.trigger( "click" );

	assert.ok( 
		db.datebox( "getTheDate" ).comp() <= today.comp(),
		"Note: Fails on final day of month"
	);
});

QUnit.test( "Relative - afterToday", function( assert ){
	var datestr,
		today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "calbox",
			afterToday: true,
			useInline: true
		});

	datestr = today.get(2) - 1;

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(" + datestr + ")" )
		.trigger( "click" );

	assert.ok( 
		db.datebox( "getTheDate" ).comp() >= today.comp(),
		"Note: Fails on first day of month"
	);
});

QUnit.test( "Relative - notToday", function( assert ){
	var datestr, nextstr,
		today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "calbox",
			notToday: true,
			useInline: true
		});

	datestr = today.get(2);

	if ( datestr === 10 ) { 
		nextstr = 11;
	} else {
		nextstr = 10;
	}

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(" + nextstr + ")")
		.trigger( "click" );

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(" + datestr + ")")
		.trigger( "click" );

	assert.notEqual(
		db.datebox( "getTheDate" ).comp(),
		today.comp(),
		"Good regardless of time-of-month"
	);
});

QUnit.test( "Relative - maxDays", function( assert ){
	var datestr,
		today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "calbox",
			maxDays: 2,
			useInline: true
		});

	datestr = today.get(2) + 3;
	today.adj(2,2);

	db.data( "mobile-datebox" ).d.intHTML
		.find("div.ui-datebox-griddate.ui-btn:contains(" + datestr + ")")
		.trigger( "click" );

	assert.ok( 
		db.datebox( "getTheDate" ).comp() <= today.comp(),
		"Note: Fails within 3 days of end of month" +
			db.datebox( "getTheDate" ).comp() + " <= " + today.comp()
	);
});

QUnit.test( "Relative - minDays", function( assert ){
	var datestr,
		today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "calbox",
			minDays: 2,
			useInline: true
		});

	datestr = today.get(2) - 3;
	today.adj(2,-2);

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(" + datestr + ")")
		.trigger( "click" );

	assert.ok( 
		db.datebox( "getTheDate" ).comp() >= today.comp(),
		"Note: Fails within 3 days of end of month.  " +
			db.datebox( "getTheDate" ).comp() + " >= " + today.comp()
		);
});

QUnit.test( "Hard - min", function( assert ){
	var today = new Date(2001,0,20,0,0,0,0),
		db = $( "<input type='text' min='2001-01-15'>" ).datebox({
			mode: "calbox",
			defaultValue: "2001-01-20",
			useInline: true
		});

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(10)" )
		.trigger( "click" );

	assert.equal(
		db.datebox( "getTheDate" ).comp(),
		today.comp(),
		"Not 'today' Dependant"
	);
});

QUnit.test( "Hard - max", function( assert ){
	var today = new Date(2001,0,10,0,0,0,0),
		db = $( "<input type='text' max='2001-01-15'>" ).datebox({
			mode: "calbox",
			defaultValue: "2001-01-10",
			useInline: true
		});

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(20)" )
		.trigger( "click" );

	assert.equal(
		db.datebox( "getTheDate" ).comp(),
		today.comp(),
		"Not 'today' Dependant"
	);
});

QUnit.test( "Lists - blackDates", function( assert ){
	var today = new Date(2001,0,1,0,0,0,0),
		db = $( "<input type='text'>" ).datebox({
			mode: "calbox",
			blackDates: ["2001-01-10"],
			defaultValue: "2001-01-01",
			useInline: true
		});

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(10)" )
		.trigger( "click" );

	assert.equal(
		db.datebox( "getTheDate").comp(),
		today.comp(),
		"Not 'today' Dependant"
	);
});

QUnit.test( "Lists - blackDatesRec", function( assert ){
	var today = new Date(2001,0,1,0,0,0,0),
		db = $( "<input type='text'>" ).datebox({
			mode: "calbox",
			blackDatesRec: [[-1,-1,10]],
			defaultValue: "2001-01-01",
			useInline: true
		});

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(10)" )
		.trigger( "click" );

	assert.equal(
		db.datebox( "getTheDate").comp(),
		today.comp(),
		"Not 'today' Dependant"
	);
});

QUnit.test( "Lists - blackDays", function( assert ){
	var today = new Date(2001,0,1,0,0,0,0),
		db = $( "<input type='text'>" ).datebox({
			mode: "calbox",
			blackDays: [3],
			defaultValue: "2001-01-01",
			useInline: true
		});

	db.data( "mobile-datebox" ).d.intHTML
		.find( "div.ui-datebox-griddate.ui-btn:contains(10)" )
		.trigger( "click" );

	assert.equal(
		db.datebox( "getTheDate").comp(),
		today.comp(),
		"Not 'today' Dependant"
	);
});

QUnit.module( "Limits - DateBox/FlipBox/SlideBox" );

QUnit.test( "Relative - beforeToday", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			beforeToday: true,
			defaultValue: new Date(2036,0,1),
			useInline: true
		});

	db.datebox( "open" );
	
	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		today.comp()
	);
});

QUnit.test( "Relative - afterToday", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			afterToday: true,
			defaultValue: new Date(2001,0,1),
			useInline: true
		});

	db.datebox( "open" );
	
	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		today.comp()
	);
});

QUnit.test( "Relative - maxDays", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			defaultValue: new Date(2036,0,1),
			maxDays: 2,
			useInline: true
		});

	today.adj(2,2);

	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		today.comp()
	);
});

QUnit.test( "Relative - minDays", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			defaultValue: new Date(2000,0,1),
			minDays: 2,
			useInline: true
		});

	today.adj(2,-2);

	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		today.comp()
	);
});

QUnit.test( "Relative - maxYear", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			defaultValue: new Date(2036,0,1),
			maxYear: 2010,
			useInline: true
		});

	today.adj(0,2);

	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		20101231
	);
});

QUnit.test( "Relative - minYear", function( assert ){
	var today = new Date(),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			defaultValue: new Date(2000,0,1),
			minYear: 2010,
			useInline: true
		});

	today.adj(0,-2);

	assert.equal( 
		db.datebox( "getTheDate" ).comp(),
		20100101
	);
});

QUnit.test( "Hard - min", function( assert ){
	var db = $( "<input type='text' min='2001-01-15'>" ).datebox({
			mode: "datebox",
			defaultValue: "1990-01-20",
			useInline: true
		});

	assert.equal(
		db.datebox( "getTheDate" ).comp(),
		20010115
	);
});

QUnit.test( "Hard - max", function( assert ){
	var db = $( "<input type='text' max='2001-01-15'>" ).datebox({
			mode: "datebox",
			defaultValue: "2020-01-10",
			useInline: true
		});
		
	assert.equal(
		db.datebox( "getTheDate" ).comp(),
		20010114
	);
});

QUnit.test( "Lists - blackDates", function( assert ){
	var db = $( "<input type='text'>" ).datebox({
			mode: "datebox",
			blackDates: ["2001-01-10"],
			defaultValue: "2001-01-10",
			useInline: true
		});
		
	expect(2);
	
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		false
	);
	
	db.data( "mobile-datebox" )._offset( "d",1);
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		true
	);
	
});

QUnit.test( "Lists - blackDatesRec", function( assert ){
	var db = $( "<input type='text'>" ).datebox({
			mode: "datebox",
			blackDatesRec: [[-1,-1,10]],
			defaultValue: "2001-01-10",
			useInline: true
		});
	
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		false
	);
	
	db.data( "mobile-datebox" )._offset( "d",1);
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		true
	);
});

QUnit.test( "Lists - blackDays", function( assert ){
	var db = $( "<input type='text'>" ).datebox({
			mode: "datebox",
			blackDays: [3],
			defaultValue: "2001-01-03",
			useInline: true
		});
	
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		false
	);
	
	db.data( "mobile-datebox" )._offset( "d",1);
	assert.equal(
		db.data( "mobile-datebox" ).dateOK,
		true
	);
});

QUnit.module( "Limits - TimeBox/TimeFlipBox/SlideBox" );

QUnit.test( "Relative - maxHour", function( assert ){
	var db = $( "<input>" ).datebox({
			mode: "timebox",
			defaultValue: "20:00",
			maxHour: 12,
			useInline: true
		});

	assert.equal( 
		db.datebox( "getTheDate" ).getHours(),
		12
	);
});

QUnit.test( "Relative - minHour", function( assert ){
	var db = $( "<input>" ).datebox({
			mode: "timebox",
			defaultValue: "6:00",
			minHour: 12,
			useInline: true
		});

	assert.equal( 
		db.datebox( "getTheDate" ).getHours(),
		12
	);
});

QUnit.module( "Parser / Formatter" );

QUnit.test( "Formatter", function( assert ){
	var date = new Date(2001,1,3,15,30),
		db = $( "<input>" ).datebox({
			mode: "datebox",
			useInline: true
		});

	expect( 26 );
	
	assert.equal( db.datebox( "callFormat", "some", date ) , "some", "Literal String" );
	assert.equal( db.datebox( "callFormat", "%a", date ) , "Sa", "Short Day" );
	assert.equal( db.datebox( "callFormat", "%A", date ) , "Saturday", "Full Day" );
	assert.equal( db.datebox( "callFormat", "%b", date ) , "Feb", "Short Month" );
	assert.equal( db.datebox( "callFormat", "%B", date ) , "February", "Full Month" );
	assert.equal( db.datebox( "callFormat", "%C", date ) , "20", "Century" );
	assert.equal( db.datebox( "callFormat", "%d", date ) , "03", "Date #" );
	assert.equal( db.datebox( "callFormat", "%-d", date ) , "3", "Date # (no pad)" );
	assert.equal( db.datebox( "callFormat", "%H", date ) , "15", "24 Hour" );
	assert.equal( db.datebox( "callFormat", "%I", date ) , "03", "12 Hour" );
	assert.equal( db.datebox( "callFormat", "%m", date ) , "02", "Month #" );
	assert.equal( db.datebox( "callFormat", "%-m", date ) , "2", "Month # (no pad)" );
	assert.equal( db.datebox( "callFormat", "%M", date ) , "30", "Minute" );
	assert.equal( db.datebox( "callFormat", "%p", date ) , "PM", "Meridiem (UC)" );
	assert.equal( db.datebox( "callFormat", "%P", date ) , "pm", "Meridiem (LC)" );
	assert.equal( db.datebox( "callFormat", "%S", date ) , "00", "Seconds" );
	assert.equal( db.datebox( "callFormat", "%w", date ) , "6", "Day of Week #" );
	assert.equal( db.datebox( "callFormat", "%y", date ) , "01", "2 Digit Year" );
	assert.equal( db.datebox( "callFormat", "%Y", date ) , "2001", "4 Digit Year" );
	assert.equal( db.datebox( "callFormat", "%E", date ) , "2544", "Buddist Era" );
	assert.equal( db.datebox( "callFormat", "%-V", date ) , "5", "%V Week" );
	assert.equal( db.datebox( "callFormat", "%-U", date ) , "4", "%V Week" );
	assert.equal( db.datebox( "callFormat", "%-W", date ) , "5", "%V Week" );
	assert.equal( db.datebox( "callFormat", "%o", date ) , "rd", "Date Ordinal" );
	assert.equal( db.datebox( "callFormat", "%j", date ) , "035", "Day of Year" );
	assert.equal( db.datebox( "callFormat", "%Y-%m-%d", date ) , "2001-02-03", "ISO Test" );
});

QUnit.test( "Parser", function( assert ){
	var goodDate, testDate,
		db = $( "<input>" ).datebox({
			mode: "datebox",
			useInline: true
		});

	expect( 9 );
	
	goodDate = new Date( 2001,2,3 );
	testDate = db.datebox( "parseDate", "%Y-%m-%d", "2001-03-03" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "ISO Date");
	
	goodDate = new Date( 2001,2,3 );
	testDate = db.datebox( "parseDate", "%-d/%-m/%Y", "3/3/2001" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "American, 4 Digit Year");
	
	goodDate = new Date( 2001,2,3 );
	testDate = db.datebox( "parseDate", "%-d/%-m/%y", "3/3/01" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "American, 2 Digit Year");
	
	goodDate = new Date( 2001,2,3 );
	testDate = db.datebox( "parseDate", "%B %-d%o, %Y", "March 3rd, 2001" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "American, Text Month w/ Ordinal");
	
	goodDate = new Date( 2001,11,26 );
	testDate = db.datebox( "parseDate", "%Y-%j", "2001-360" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "ISO Ordinal Date");
	
	goodDate = new Date( 2001,4,28 );
	testDate = db.datebox( "parseDate", "%Y-W%V-%w", "2001-W22-3" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "ISO Week Date w/ Day");
	
	goodDate = new Date( 1900,0,1,15,30 );
	testDate = db.datebox( "parseDate", "%H:%M", "15:30" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "ISO Time");
	
	goodDate = new Date( 1900,0,1,15,30 );
	testDate = db.datebox( "parseDate", "%-I:%M%p", "3:30PM" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "12hr Time");
	
	goodDate = new Date( 2001,2,3,15,30 );
	testDate = db.datebox( "parseDate", "%Y-%m-%dT%H:%M", "2001-03-03T15:30" );
	assert.deepEqual( testDate.getArray(), goodDate.getArray(), "ISO Date w/ Time");
});
