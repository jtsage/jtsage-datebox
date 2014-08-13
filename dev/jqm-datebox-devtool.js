/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CALBOX Mode */

(function($) {
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
