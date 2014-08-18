// Sets the require.js configuration for your application.
require.config( {

	baseUrl: "./",

	// 3rd party script alias names
	paths: {
		// Core Libraries
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
		"jquerymobile": "//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min",
		"jqmdatebox": "//cdn.jtsage.com/datebox/unstable/jqm-datebox.all.amd",
	},
});

require([
	"jquery",
], function ( $ ) {
	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function () {
			// JQM Defaults here.
		}
	);

	require( [ "jquerymobile" ], function () {
		// JQM Stuff here.
	});
	require( ["jqmdatebox"] , function() {
		// Because we are hooking into jQM, possibly (and likely) after it has been executed,
		// and because we are doing it in a non-blocking manner, we have to call the enhanceWithin
		// below - or the inputs won't get enhanced. 
		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			// DateBox Defaults Could Go Here.
		});
		$( ":jqmData(role='datebox')" ).parent().enhanceWithin();
	});
});


