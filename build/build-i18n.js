/**
 * JTSage-DateBox
 * @fileOverview Build the datebox i18n files
 * 
 * DO NOT RUN THIS FILE DIRECTLY! CALL FROM NPM!
 * 
 *  # npm run build-i18n
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

const config      = require( "../package.json" ),
	fs            = require( "fs" ),
	UglifyJS      = require( "uglify-js" ),
	glob          = require( "glob" ),
	rimraf        = require( "rimraf" ),
	Gettext       = require("node-gettext"),
	gettextParser = require("gettext-parser"),
	gt            = new Gettext();

var thisLang, thisContents, thisJS, minJS,
	allLang       = {},
	today         = new Date(),
	poFiles       = glob.sync( "i18n/locale/*/datebox.po" ),
	outFilePrefix = "dist/i18n/jtsage-datebox.i18n.",
	outFolder     = "dist/i18n",
	banner        = [
		"/*",
		" * JTSage-DateBox-" + config.version,
		" * Date: " + today.toISOString(),
		" * http://dev.jtsage.com/DateBox/",
		" * https://github.com/jtsage/jquery-mobile-datebox",
		" *",
		" * Copyright 2010, " + today.getFullYear() + " JTSage. and other contributors",
		" * Released under the MIT license.",
		" * https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt",
		" *",
		" */",
		"" ]
		.join( "\n"),
	banshort      = [
		"/* JTSage-DateBox-" + config.version,
		today.toISOString(),
		"(c) 2010," + today.getFullYear() + " JTSage",
		"https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt */\n" ]
		.join( " | " );

function _( lang, string ) {
	return gt.dgettext( lang, string );
}

function buildLang(l) {
	return {
		setDateButtonLabel     : _( l, "Set Date" ),
		setTimeButtonLabel     : _( l, "Set Time" ),
		setDurationButtonLabel : _( l, "Set Duration" ),
		todayButtonLabel       : _( l, "Jump to Today" ),
		titleDateDialogLabel   : _( l, "Choose Date" ),
		titleTimeDialogLabel   : _( l, "Choose Time" ),
		daysOfWeek : [
			_( l, "Sunday" ),
			_( l, "Monday" ),
			_( l, "Tuesday" ),
			_( l, "Wednesday" ),
			_( l, "Thursday" ),
			_( l, "Friday" ),
			_( l, "Saturday")
		],
		daysOfWeekShort : [
			_( l, "Su" ),
			_( l, "Mo" ),
			_( l, "Tu" ),
			_( l, "We" ),
			_( l, "Th" ),
			_( l, "Fr" ),
			_( l, "Sa" ),
		],
		monthsOfYear : [
			_( l, "January" ),
			_( l, "February" ),
			_( l, "March" ),
			_( l, "April" ),
			_( l, "May" ),
			_( l, "June" ),
			_( l, "July" ),
			_( l, "August" ),
			_( l, "September" ),
			_( l, "October" ),
			_( l, "November" ),
			_( l, "December")
		],
		monthsOfYearShort : [
			_( l, "Jan" ),
			_( l, "Feb" ),
			_( l, "Mar" ),
			_( l, "Apr" ),
			_( l, "Ma" ),
			_( l, "Jun" ),
			_( l, "Jul" ),
			_( l, "Aug" ),
			_( l, "Sep" ),
			_( l, "Oct" ),
			_( l, "Nov" ),
			_( l, "Dec")
		],
		durationLabel : [
			_( l, "Days" ),
			_( l, "Hours" ),
			_( l, "Minutes" ),
			_( l, "Seconds")
		],
		durationDays : [
			_( l, "Day" ),
			_( l, "Days")
		],
		tooltip            : _( l, "Open Date Picker" ),
		nextMonth          : _( l, "Next Month" ),
		prevMonth          : _( l, "Previous Month" ),
		timeFormat         : parseInt( _( l, "24" ), 10 ),
		headerFormat       : _( l, "%A, %B %-d, %Y" ),
		dateFieldOrder     : eval( "[" + _( l, "'m', 'd', 'y'") + "]" ),
		timeFieldOrder     : eval( "[" + _( l, "'h', 'i', 'a'") + "]" ),
		slideFieldOrder    : eval( "[" + _( l, "'y', 'm', 'd'") + "]" ),
		datetimeFieldOrder : eval( "[" + _( l, "'y', 'm', 'd', 'h', 'i', 's', 'a'") + "]" ),
		datetimeFormat     : _( l, "%Y-%m-%dT%k:%M:%S" ),
		dateFormat         : _( l, "%Y-%m-%d" ),
		useArabicIndic     : (_( l, "false1") === "true" ? true : false ),
		isRTL              : (_( l, "false2") === "true" ? true : false ),
		calStartDay        : parseInt(_( l, "0" ), 10),
		clearButton        : _( l, "Clear" ),
		durationOrder      : eval( "[" + _( l, "'d', 'h', 'i', 's'") + "]" ),
		meridiem : [
			_( l, "AM" ),
			_( l, "PM")
		],
		timeOutput          : _( l, "%l:%M %p" ),
		durationFormat      : _( l, "%Dd %DA, %Dl:%DM:%DS" ),
		calDateListLabel    : _( l, "Other Dates" ),
		calHeaderFormat     : _( l, "%B %Y" ),
		tomorrowButtonLabel : _( l, "Jump to Tomorrow")
	};
}

function makeMultiFile( data ) {
	return banner + "jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang, "+
		JSON.stringify( data, null, "\t" ) +
		");\n" +
		"jQuery.extend(jQuery.jtsage.datebox.prototype.options, {\n" +
		"\tuseLang: \"en\"\n" +
		"});\n";
}

function makeSingleFile( lang, data ) {
	return banner + "jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang" +
		", { \"" + lang +  "\": " +
		JSON.stringify( data, null, "\t" ) +
		"});\n" +
		"jQuery.extend(jQuery.jtsage.datebox.prototype.options, {\n" +
		"\tuseLang: \"" + lang + "\"\n" +
		"});\n";
}

rimraf.sync( outFolder );

fs.mkdirSync( outFolder , { recursive : true } );

poFiles.forEach( function( thisFile ) {
	thisLang     = thisFile.replace("i18n/locale/","").replace("/datebox.po","");
	thisContents = gettextParser.po.parse( fs.readFileSync( thisFile ) );

	gt.addTranslations( "", thisLang, thisContents );

	allLang[ thisLang ] = buildLang( thisLang );

	thisJS = makeSingleFile( thisLang, allLang[ thisLang ] );

	fs.writeFileSync(
		outFilePrefix + thisLang + ".utf8.js",
		thisJS
	);

	minJS = UglifyJS.minify( thisJS, {
		mangle   : true,
		compress : true,
		output   : {
			beautify : false,
			preamble : banshort
		}
	} );

	fs.writeFileSync(
		outFilePrefix + thisLang + ".utf8.min.js",
		minJS.code
	);

	console.log( outFilePrefix + thisLang + ".utf8.js written.");

});

thisJS = makeMultiFile( allLang );
minJS  = UglifyJS.minify( thisJS, {
	mangle   : true,
	compress : true,
	output   : {
		beautify : false,
		preamble : banshort
	}
} );

fs.writeFileSync(
	outFolder + "/jtsage-datebox.lang.utf8.js",
	thisJS
);

fs.writeFileSync(
	outFolder + "/jtsage-datebox.lang.utf8.min.js",
	minJS.code
);

console.log( outFolder + "/jtsage-datebox.lang.utf8.js written.");
