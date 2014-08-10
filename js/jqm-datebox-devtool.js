/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CALBOX Mode */

(function($) {
	window.clogall = function(listarg) {
		var fulllist = [];
		for ( key in listarg ) {
			fulllist.push(key + ": " + listarg[key]);
		}
		console.log(fulllist.join("   "));
		
	}
})( jQuery );
