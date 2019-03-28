/* eslint-env node */


/*
THIS FILE IS BROKEN!!!!  MOVING TO NPM TO BUILD!!!
*/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON( "package.json" ),
		clean : {
			web     : ["doc_builder/dist/"],
			builder : ["node_builder/src/<%= pkg.version %>/"]
		},
		buildSite : {
			main_site : {
				options : {
					headerFile : "doc_builder/include/header.html",
					footerFile : "doc_builder/include/footer.html",
					configFile : "doc_builder/data/datebox.yml",
					apidocFile : "doc_builder/data/api.yml",
					interfFile : "doc_builder/data/interface.yml",
				},
				files : [{
					expand : true,
					cwd    : "doc_builder/pages/",
					src    : "*.md",
					dest   : "doc_builder/dist/",
					rename : function(dest, src) {
						return dest + src.replace(/^(.+)\.md$/, function ( match, file ) {
							if ( file === "index" ) { return "index.html"; }
							return file + "/index.html";
						});
					}
				}]
			}
		},
		copy : {
			builder1 : {
				expand : true,
				cwd    : "src/js",
				src    : "**/*.js",
				dest   : "node_builder/src/<%= pkg.version %>/js/"
			},
			web1 :    {
				expand : true,
				cwd    : "doc_builder/samples",
				src    : "*.html",
				dest   : "doc_builder/dist/samples/"
			},
			web2 :    {
				expand : true,
				cwd    : "doc_builder/webroot",
				src    : "*",
				dest   : "doc_builder/dist/"
			}
		},
		prettify : {
			options : {
				condense : true,
				indent : 2,
				indent_char : " ",
				// Task-specific options go here.
			},
			all : {
				expand : true,
				cwd    : "doc_builder/dist/",
				ext    : ".html",
				src    : ["**/*.html"],
				dest   : "doc_builder/dist/"
			},
		},
		connect : {
			web : {
				options : {
					port             : 8080,
					base             : "doc_builder/dist",
					useAvailablePort : true,
					keepalive        : true,
				}
			}
		},
		jsdoc : {
			dist : {
				src : ["src/js/**/*.js", "!src/js/external/*.js"],
				options : {
					destination : "doc_builder/dist/jsdoc",
					template    : "node_modules/ink-docstrap/template",
					configure   : "node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},

	});

	

	grunt.registerTask( "release", "Build a release version of DateBox", [
		"eslint",
		"yaml_validator",
		"clean:release",
		"clean:web",
		"buildDBoxes:release_widget_bundled",
		"buildDBoxes:release_none_bundled",
		"uglify:release",
		"committers",
		"updatebuilder",
		"makei18n"
	] );





	grunt.registerTask( "updatebuilder", "Update web builder sources", [
		"clean:builder",
		"copy:builder1"
	] );

	grunt.registerTask( "web", "Build the documentation site", [
		"clean:web",
		"buildSite",
		"copy:web1",
		"copy:web2",
		"jsdoc",
		"prettify"
	] );

	grunt.registerTask( "serveweb", "Start a local HTTP server on localhost:8080 for the docs.", [
		"connect:web"
	] );

};
