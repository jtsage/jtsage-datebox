/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CALBOX Mode */

(function($) {
	window.spf = function(text, repl) {
		if ( ! $.isArray(repl) && ! $.isPlainObject(repl) ) { console.log('a'); return text; }
		return text.replace(/{(.+?)}/g, function( match, oper ) {
			console.log(match);
			console.log(oper);
			return repl[oper];
		});
	}
	window.clogall = function(listarg) {
		var key, fulllist = [];
		for ( key in listarg ) {
			fulllist.push(key + ": " + listarg[key]);
		}
		console.log(fulllist.join("   "));
		
	};
	window.timetext = function(x, func) {
		var y, outTime, inTime = new Date();
		for ( y = 0; y < x; y++ ) {
			func.apply();
		}
		outTime = new Date();
		console.log( outTime.getTime() - inTime.getTime() );
	};
})( jQuery );
