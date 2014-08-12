QUnit.module( "defaultValue Tests" );
QUnit.test("Date Object Test", function( assert ){
	var db = $('<input>').datebox({mode: "datebox",defaultValue: new Date(2001,0,1)});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "2001-01-01", "Output should be ISO 2001-01-01 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Date Array Test", function( assert ){
	var db = $('<input>').datebox({mode: "datebox",defaultValue: [2001,0,1]});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "2001-01-01", "Output should be ISO 2001-01-01 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Date String Test", function( assert ){
	var db = $('<input>').datebox({mode: "datebox",defaultValue: "2001-01-01"});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "2001-01-01", "Output should be ISO 2001-01-01 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Date Epoch Test", function( assert ){
	var db = $('<input>').datebox({mode: "datebox",defaultValue: 122410});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "1970-01-02", "Output should be ISO 1970-01-02 ("+db.val()+") - Note, if you are in GMT-11, this test will always fail" );
	
	db.datebox('destroy');
});

QUnit.test("Time Object Test", function( assert ){
	var db = $('<input>').datebox({mode: "timebox",defaultValue: new Date(2001,0,1,1,30,0,0)});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "01:30", "Output should be 01:30 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Time Array Test", function( assert ){
	var db = $('<input>').datebox({mode: "timebox",defaultValue: [1,30,0]});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "01:30", "Output should be 01:30 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Time String Test (2 Element)", function( assert ){
	var db = $('<input>').datebox({mode: "timebox",defaultValue: "1:30"});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "01:30", "Output should be 01:30 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Time String Test (3 Element)", function( assert ){
	var db = $('<input>').datebox({mode: "timebox",defaultValue: "1:30:00"});

	db.trigger("datebox", {"method":"doset"});

	assert.equal( db.val(), "01:30", "Output should be 01:30 ("+db.val()+")" );
	
	db.datebox('destroy');
});

QUnit.module( "input val() Tests" );
QUnit.test("Date Test", function( assert ){
	var newDate = new Date(2001,0,1),
		db = $('<input value="2001-01-01">').datebox({mode: "datebox"});

	assert.deepEqual( db.datebox('getTheDate').comp(), newDate.comp(), "Expected ("+newDate.comp()+"), Got ("+db.datebox('getTheDate').comp()+")" );
	
	db.datebox('destroy');
});

QUnit.test("Time Test", function( assert ){
	var goodDate = [1,30], gotDate,
		db = $('<input value="01:30">').datebox({mode: "timebox"});

	gotDate = db.datebox('getTheDate').getArray().slice(3).slice(0,2);

	assert.deepEqual( gotDate, goodDate, "Expected ("+goodDate+"), Got ("+gotDate+")" );
	
	db.datebox('destroy');
});