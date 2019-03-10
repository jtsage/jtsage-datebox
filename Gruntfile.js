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
						"!src/js/extWidgetLib.js"
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
					src: [ "src/js/*.js", "!src/js/extWidgetLib.js" ]
				},
				options: {
					"undef": true,
					"unused": true,
					"boss": true,
					"curly": true,
					"eqeqeq": true,
					"eqnull": true,
					"expr": true,
					"immed": true,
					"noarg": true,
					"onevar": true,
					"quotmark": true,
					"smarttabs": true,
					"trailing": true,
					"indent": 4,
					"node": true,
					"predef": [ "jQuery", "document", "window", "setTimeout", "clearTimeout" ]
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
			web: ["docs/_site/"],
			latest: ["dist/latest/"],
			release: ["dist/<%= pkg.version %>/"],
			i18n: ["dist/i18n"],
			builder: ["node_builder/src/<%= pkg.version %>/"]
		},
		uglify: {
			options: {
				banner: "<%= txt.banner.short %>",
				verbose: true
			},
			release: {
				files: [ {
					expand: true,
					src: ["dist/<%= pkg.version %>/*.js"],
					dest: "",
					ext: ".min.js",
					extDot: "last" 
				} ]
			},
			i18n: {
				files: [ {
					expand: true,
					src: ["dist/i18n/*.js"],
					dest: "",
					ext: ".min.js",
					extDot: "last" 
				} ]
			},
			latest: {
				options: {
					sourceMap: true,
				},
				files: [ {
					expand: true,
					src: ["dist/latest/*.js"],
					dest: "",
					ext: ".min.js",
					extDot: "last" 
				} ]
			}
		},
		committers: {
			options: {
				sort: "commits",
				email: true,
				nomerges: true,
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
					headerFile: "doc_builder/include/header.html",
					footerFile: "doc_builder/include/footer.html",
					configFile: "doc_builder/data/datebox.yml",
					apidocFile: "doc_builder/data/api.yml"
				},
				files: [{
					expand: true,
					cwd: "doc_builder/pages/",
					src: "*.md",
					dest: "doc_builder/dist/",
					rename: function(dest, src) {
						return dest + src.replace(/^(.+)\.md$/, function ( match, file ) {
							if ( file === "index" ) { return "index.html"; }
							return file + "/index.html"
						});
					}
				}]
			}
		},
		buildDBox: {
			latest_bootstrap: {
				options: {
					dest: "dist/latest/jtsage-datebox.bootstrap.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/bootstrap.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			latest_bootstrap4: {
				options: {
					dest: "dist/latest/jtsage-datebox.bootstrap4.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/bootstrap4.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			latest_jqueryui: {
				options: {
					dest: "dist/latest/jtsage-datebox.jqueryui.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/jqueryui.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			main_bootstrap: {
				options: {
					dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.bootstrap.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/bootstrap.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			main_bootstrap4: {
				options: {
					dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.bootstrap4.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/bootstrap4.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			main_jqueryui: {
				options: {
					dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqueryui.js",
					includeBinding: true,
				},
				libFiles: [ "src/js/external/*.js" ],
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/jqueryui.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
			},
		copy: {
			builder1: {
				expand: true,
				cwd: "src/js",
				src: "**/*.js",
				dest: "node_builder/src/<%= pkg.version %>/js/"
			},
			builder2: {
				expand: true,
				cwd: "dist/<%= pkg.version %>/",
				src: "*.css",
				dest: "node_builder/src/<%= pkg.version %>/css/",
				rename: function(dest, src) {
					return dest + src.replace( "jtsage-datebox-" + pkgJSON.version + "." , "" );
				}
			}
		},
		prettify: {
			options: {
				// Task-specific options go here.
			},
			all: {
				expand: true,
				cwd: "docs/_site/",
				ext: ".html",
				src: ["**/*.html"],
				dest: "docs/_site/"
			},
		},
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-git-committers" );
	grunt.loadNpmTasks( "grunt-prettify" );
	
	grunt.task.loadTasks( "build/tasks" );
	
	grunt.registerTask( "jshint_reg", "Run Full jsHint Testing", [
		"jshint:grunt",
		"jshint:doc",
		"jshint:js",
		"jshint:js2"
	]);
	
	grunt.registerTask( "jshint_sane", "Run jsHint with sane values", [
		"jshint:js_sane",
	]);


	grunt.registerTask( "release", "Build a release version of DateBox", [
		"jshint:js",
		"jshint:js2",
		"clean:release",
		"clean:web",
		"buildDBox:main_jqm",
		"buildDBox:main_bootstrap",
		"buildDBox:main_bootstrap4",
		"uglify:release",
		"committers",
		"updatebuilder",
		"prettify",
		"makei18n"
	] );

	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"buildDBox:latest_bootstrap",
		"buildDBox:latest_bootstrap4",
		"buildDBox:latest_jqueryui",
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
		"clean:web", "prettify"
	] );
	grunt.registerTask( "fulltest", "Deeply test the DateBox Suite", [ "jshint_reg"] );
	grunt.registerTask( "test", "Test the DateBox Suite", ["jshint:js", "jshint:js2"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint_sane",
		"latest"
	] );
	
	

};
