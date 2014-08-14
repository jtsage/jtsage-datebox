requirejs.config({
	"paths": {
		// requireJS plugins
		"text": "../external/requirejs/plugins/text",
		"json": "../external/requirejs/plugins/json",
		"jquery": "../external/jquery/jquery",
	},
	"shim": {
		"jquery-ui/jquery.ui.widget": [ "jquery" ],
		"jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
		"jquery-ui/jquery.ui.core": [ "jquery" ]
	}
});
