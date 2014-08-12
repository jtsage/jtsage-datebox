/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

/* Data Limiting QUnit Tests */


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



