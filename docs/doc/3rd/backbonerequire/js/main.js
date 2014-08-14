// Sets the require.js configuration for your application.
require.config( {

	baseUrl: "./",

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "external/jquery/jquery",
		"jquerymobile": "external/jquerymobile/jquery.mobile",
		"underscore": "//rawgithub.com/lodash/lodash/2.4.1/dist/lodash",
		"backbone": "//rawgithub.com/jashkenas/backbone/0.9.2/backbone",
		"jqmdatebox": "external/jqmdatebox/jqm-datebox",

		"backbone-requirejs-demos": "./js"
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		},
		"jqmdatebox": {
			"deps": ["jquery", "jquerymobile"]
		}

	}

});

// Includes File Dependencies
require([
	"jquery",
	"backbone",
	"backbone-requirejs-demos/routers/mobileRouter"
], function ( $, Backbone, Mobile ) {

	$( document ).on( "mobileinit",

		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function () {

			// Prevents all anchor click handling including the addition of active button state and
			// alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	);

	require( [ "jquerymobile" ], function () {

		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
	require( ["jqmdatebox"] , function() {
		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			// DateBox Defaults Could Go Here.
		});
		$( ":jqmData(role='datebox')" ).each(function() {
			var defed = typeof ($(this).data( "mobile-datebox" ));
			if ( defed === "undefined" ) {
				$(this).datebox();
			}
		});
		
	});
});
