var pkgJSON = require( "./package.json" );

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		txt: {
			copyYear: grunt.template.today( "UTC:yyyy" ),
			banner : {
				long: [
					"/*",
					" * JTSage-DateBox-" + pkgJSON.version,
					" * For: " + JSON.stringify(pkgJSON.supports),
					" * Date: " + grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
					" * http://dev.jtsage.com/DateBox/",
					" * https://github.com/jtsage/jquery-mobile-datebox",
					" *",
					" * Copyright 2010, <%= txt.copyYear %> JTSage. and other contributors",
					" * Released under the MIT license.",
					" * https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt",
					" *",
					" */",
					"" ].join( grunt.util.linefeed ),
				short: "/*! JTSage-DateBox-" + pkgJSON.version + " |" + 
					grunt.template.today( "UTC:yyyy-mm-dd" ) + "T" + 
					grunt.template.today( "UTC:HH:MM:ss" ) +
					"Z | (c) 2010,  <%= txt.copyYear %> JTSage | " +
					"https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt */\n"
			}
		},
		jshint: {
			js: {
				files: {
					src: [
						"src/js/*.js",
						"src/js/lib/*.js",
						"src/js/framework/*.js",
						"src/js/modes/*.js",
						"!src/js/baseObject.js",
						"!src/js/external/*.js"
					]
				},
				options: {
					jshintrc: "src/js/.jshintrc"
				}
			},
			js2: {
				files: {
					src: [
						"src/js/baseObject.js"
					]
				},
				options: {
					jshintrc: "src/js/.jshintrc2"
				}
			},
			js_sane: {
				files: {
					src: [ "src/js/*.js", "!src/js/external/*.js" ]
				},
				options: {
					"undef"     : true,
					"unused"    : true,
					"boss"      : true,
					"curly"     : true,
					"eqeqeq"    : true,
					"eqnull"    : true,
					"expr"      : true,
					"immed"     : true,
					"noarg"     : true,
					"onevar"    : true,
					"quotmark"  : true,
					"smarttabs" : true,
					"trailing"  : true,
					"indent"    : 4,
					"node"      : true,
					"predef"    : [ "jQuery", "document", "window", "setTimeout", "clearTimeout" ]
				}
			},
			grunt: {
				files: {
					src: [ "Gruntfile.js", "build/tasks/*.js" ]
				},
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		clean: {
			web     : ["doc_builder/dist/"],
			latest  : ["dist/latest/"],
			release : ["dist/<%= pkg.version %>/"],
			i18n    : ["dist/i18n"],
			builder : ["node_builder/src/<%= pkg.version %>/"]
		},
		uglify: {
			options: {
				banner: "<%= txt.banner.short %>",
				verbose: true
			},
			release: {
				files: [ {
					expand : true,
					src    : ["dist/<%= pkg.version %>/*.js"],
					dest   : "",
					ext    : ".min.js",
					extDot : "last"
				} ]
			},
			i18n: {
				files: [ {
					expand : true,
					src    : ["dist/i18n/*.js"],
					dest   : "",
					ext    : ".min.js",
					extDot : "last"
				} ]
			},
			latest: {
				options: {
					sourceMap: true,
				},
				files: [ {
					expand : true,
					src    : ["dist/latest/*.js"],
					dest   : "",
					ext    : ".min.js",
					extDot : "last"
				} ]
			}
		},
		committers: {
			options: {
				sort     : "commits",
				email    : true,
				nomerges : true,
			}
		},
		makei18n: {
			all: {
				src: [ "i18n/locale/*/datebox.po"]
			}
		},
		buildSite: {
			main_site:{
				options : {
					headerFile : "doc_builder/include/header.html",
					footerFile : "doc_builder/include/footer.html",
					configFile : "doc_builder/data/datebox.yml",
					apidocFile : "doc_builder/data/api.yml",
					interfFile : "doc_builder/data/interface.yml",
				},
				files: [{
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
		buildDBoxes: {
			latest_both_bundled: {
				options: {
					dest           : "dist/latest/",
					filename       : "jtsage-datebox",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/*.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/*.js",
					"!src/js/framework/bootstrap4.js",
					"!src/js/framework/jqm.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			latest_widget_bundled: {
				options: {
					dest           : "dist/latest/",
					filename       : "jtsage-datebox",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/widgetLib.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/bootstrap4.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			latest_popper_bundled: {
				options: {
					dest           : "dist/latest/",
					filename       : "jtsage-datebox",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/popper.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/jqm.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			release_both_bundled: {
				options: {
					dest           : "dist/<%= pkg.version %>/",
					filename       : "jtsage-datebox-<%= pkg.version %>",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/*.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/*.js",
					"!src/js/framework/bootstrap4.js",
					"!src/js/framework/jqm.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			release_widget_bundled: {
				options: {
					dest           : "dist/<%= pkg.version %>/",
					filename       : "jtsage-datebox-<%= pkg.version %>",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/widgetLib.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/bootstrap4.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			release_popper_bundled: {
				options: {
					dest           : "dist/<%= pkg.version %>/",
					filename       : "jtsage-datebox-<%= pkg.version %>",
					includeBinding : true,
				},
				externalLibs : [ "src/js/external/popper.js" ],
				baseObject   : [ "src/js/baseObject.js" ],
				frameWorks   : [
					"src/js/framework/jqm.js"
				],
				files: [{
					expand : true,
					src    : [
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
		},
		copy: {
			builder1: {
				expand : true,
				cwd    : "src/js",
				src    : "**/*.js",
				dest   : "node_builder/src/<%= pkg.version %>/js/"
			},
			builder2: {
				expand : true,
				cwd    : "dist/<%= pkg.version %>/",
				src    : "*.css",
				dest   : "node_builder/src/<%= pkg.version %>/css/",
				rename : function(dest, src) {
					return dest + src.replace( "jtsage-datebox-" + pkgJSON.version + "." , "" );
				}
			},
			web1:    {
				expand : true,
				cwd    : "doc_builder/samples",
				src    : "*.html",
				dest   : "doc_builder/dist/samples/"
			},
			web2:    {
				expand : true,
				cwd    : "doc_builder/webroot",
				src    : "*",
				dest   : "doc_builder/dist/"
			}
		},
		prettify: {
			options: {
				condense : true,
				indent: 2,
				indent_char: " ",
				// Task-specific options go here.
			},
			all: {
				expand : true,
				cwd    : "doc_builder/dist/",
				ext    : ".html",
				src    : ["**/*.html"],
				dest   : "doc_builder/dist/"
			},
		},
		connect: {
			web: {
				options: {
					port             : 8080,
					base             : "doc_builder/dist",
					useAvailablePort : true,
					keepalive        : true,
				}
			}
		},
		jsdoc : {
			dist : {
				src: ["src/js/**/*.js", "!src/js/external/*.js"],
				options: {
					destination : "doc_builder/dist/jsdoc",
					template    : "node_modules/ink-docstrap/template",
					configure   : "node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},
		cloc: {
			just_datebox : {
				options : ["--exclude-dir=external"],
				src     : ["src/js"]
			},
			everything   : {
				options : ["--exclude-list-file=.clocignore"],
				src : ["."]
			}
		},
		yaml_validator: {
			defaults: {
			  src: [ "doc_builder/data/*.yml" ]
			}
		  }
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-git-committers" );
	grunt.loadNpmTasks( "grunt-prettify" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-jsdoc" );
	grunt.loadNpmTasks( "grunt-cloc" );
	grunt.loadNpmTasks( "grunt-yaml-validator" );

	grunt.task.loadTasks( "build/tasks" );
	
	grunt.registerTask( "jshint_reg", "Run Full jsHint Testing", [
		"jshint:grunt",
		"jshint:js",
		"jshint:js2"
	]);
	
	grunt.registerTask( "jshint_sane", "Run jsHint with sane values", [
		"jshint:js_sane",
	]);


	grunt.registerTask( "release", "Build a release version of DateBox", [
		"jshint:js",
		"jshint:js2",
		"yaml_validator",
		"clean:release",
		"clean:web",
		"buildDBoxes:release_widget_bundled",
		"buildDBoxes:release_both_bundled",
		"buildDBoxes:release_popper_bundled",
		"uglify:release",
		"committers",
		"updatebuilder",
		"makei18n"
	] );

	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"buildDBoxes:latest_widget_bundled",
		"buildDBoxes:latest_both_bundled",
		"buildDBoxes:latest_popper_bundled",
		"uglify:latest",
	]);

	grunt.registerTask( "i18n", "Build the i18n files", [
		"clean:i18n",
		"makei18n",
		"uglify:i18n"
	] );

	grunt.registerTask( "updatebuilder", "Update web builder sources", [ 
		"clean:builder",
		"copy:builder1",
		"copy:builder2"
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
	
	grunt.registerTask( "fulltest", "Deeply test the DateBox Suite", [
		"jshint_reg",
		"yaml_validator"
	] );

	grunt.registerTask( "countcode", "Count all code", [ "cloc" ] );

	grunt.registerTask( "test", "Test the DateBox Suite", [
		"jshint:js",
		"jshint:js2",
		"yaml_validator"
	] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint_sane",
		"latest"
	] );
	
	

};
