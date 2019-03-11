/* jshint evil: true */

module.exports = function(grunt) {
	"use strict";
	
	var alllang = {},
		fs = require("fs"),
		Gettext = require("node-gettext"),
		gettextParser = require("gettext-parser"),
		gt = new Gettext(),
	
		_ = function(a,b) {
			return gt.dgettext(a,b);
		},
		makeMultiFile = function(data) {
			var ban = grunt.config("txt");
			return ban.banner.long + "jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang, "+
				JSON.stringify( data, null, "\t" ) +
				");\n" + 
				"jQuery.extend(jQuery.jtsage.datebox.prototype.options, {\n" + 
				"\tuseLang: \"en\"\n" +
				"});\n";
		},
		makeSingleFile = function(l, data) {
			var ban = grunt.config("txt");
			return ban.banner.long + "jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang" +
				", { \"" + l +  "\": " +
				JSON.stringify( data, null, "\t" ) +
				"});\n" + 
				"jQuery.extend(jQuery.jtsage.datebox.prototype.options, {\n" + 
				"\tuseLang: \"" + l + "\"\n" +
				"});\n";
		},
		makeLang = function(l) {
			return {
				setDateButtonLabel: _(l, "Set Date"),
				setTimeButtonLabel: _(l, "Set Time"),
				setDurationButtonLabel: _(l, "Set Duration"),
				todayButtonLabel: _(l, "Jump to Today"),
				titleDateDialogLabel: _(l, "Choose Date"),
				titleTimeDialogLabel: _(l, "Choose Time"),
				daysOfWeek: [
					_(l, "Sunday"),
					_(l, "Monday"),
					_(l, "Tuesday"),
					_(l, "Wednesday"),
					_(l, "Thursday"),
					_(l, "Friday"),
					_(l, "Saturday")
				],
				daysOfWeekShort: [
					_(l, "Su"),
					_(l, "Mo"),
					_(l, "Tu"),
					_(l, "We"),
					_(l, "Th"),
					_(l, "Fr"),
					_(l, "Sa"),
				],
				monthsOfYear: [
					_(l, "January"),
					_(l, "February"),
					_(l, "March"),
					_(l, "April"),
					_(l, "May"),
					_(l, "June"),
					_(l, "July"),
					_(l, "August"),
					_(l, "September"),
					_(l, "October"),
					_(l, "November"),
					_(l, "December")
				],
				monthsOfYearShort: [
					_(l, "Jan"),
					_(l, "Feb"),
					_(l, "Mar"),
					_(l, "Apr"),
					_(l, "Ma"),
					_(l, "Jun"),
					_(l, "Jul"),
					_(l, "Aug"),
					_(l, "Sep"),
					_(l, "Oct"),
					_(l, "Nov"),
					_(l, "Dec")
				],
				durationLabel: [
					_(l, "Days"),
					_(l, "Hours"),
					_(l, "Minutes"),
					_(l, "Seconds")
				],
				durationDays: [
					_(l, "Day"),
					_(l, "Days")
				],
				tooltip: _(l, "Open Date Picker"),
				nextMonth: _(l, "Next Month"),
				prevMonth: _(l, "Previous Month"),
				timeFormat: parseInt(_(l, "24"), 10),
				headerFormat: _(l, "%A, %B %-d, %Y"),
				dateFieldOrder: eval( "[" + _(l, "'m', 'd', 'y'") + "]" ),
				timeFieldOrder: eval( "[" + _(l, "'h', 'i', 'a'") + "]" ),
				slideFieldOrder: eval( "[" + _(l, "'y', 'm', 'd'") + "]" ),
				datetimeFieldOrder: eval( "[" + _(l, "'y', 'm', 'd', 'h', 'i', 's', 'a'") + "]" ),
				datetimeFormat: _(l, "%Y-%m-%dT%k:%M:%S"),
				dateFormat: _(l, "%Y-%m-%d"),
				useArabicIndic: (_(l, "false1") === "true" ? true : false ),
				isRTL: (_(l, "false2") === "true" ? true : false ),
				calStartDay: parseInt(_(l, "0"), 10),
				clearButton: _(l, "Clear"),
				durationOrder: eval( "[" + _(l, "'d', 'h', 'i', 's'") + "]" ),
				meridiem: [
					_(l, "AM"),
					_(l, "PM")
				],
				timeOutput: _(l, "%l:%M %p"),
				durationFormat: _(l, "%Dd %DA, %Dl:%DM:%DS"),
				calDateListLabel: _(l, "Other Dates"),
				calHeaderFormat: _(l, "%B %Y"),
				tomorrowButtonLabel: _(l, "Jump to Tomorrow")
			};
		};
		
	grunt.registerMultiTask("makei18n", "Make i18n Files", function() {
		this.files.forEach(function(file) {
			file.src.forEach(function(afile) {
				var lang, contents, desty;
				
				if ( !grunt.file.exists(afile) ) {
					grunt.log.warn("Source file \"" + afile + "\" not found.");
					return false;
				} else {
					lang = afile.replace("i18n/locale/","").replace("/datebox.po","");
					desty = "dist/i18n/jtsage-datebox.i18n." + lang + ".utf8.js";
					//contents = fs.readFileSync(afile);
					contents = gettextParser.po.parse(fs.readFileSync(afile));
					gt.addTranslations("", lang, contents);
					alllang[lang] = makeLang(lang);
					grunt.file.write( desty, makeSingleFile( lang, alllang[lang] ) );
				}
			});
		});
		grunt.file.write("dist/i18n/jtsage-datebox.lang.utf8.js", makeMultiFile( alllang ));
	});
};


