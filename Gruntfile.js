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
					" * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt",
					" *",
					" */",
					"" ].join( grunt.util.linefeed ),
				short: "/*! JTSage-DateBox-" + pkgJSON.version + " |" + 
					grunt.template.today( "UTC:yyyy-mm-dd" ) + "T" + 
					grunt.template.today( "UTC:HH:MM:ss" ) +
					"Z | (c) 2010,  <%= txt.copyYear %> JTSage | " +
					"https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt */\n"
			}
		},
		qunit: {
			files: ["docs/qunit/_cver.html"]
		},
		jshint: {
			js: {
				files: {
					src: [
						"src/js/*.js",
						"src/js/lib/*.js",
						"src/js/framework/*.js",
						"src/js/modes/*.js",
						"!src/js/baseObject.js"
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
					src: [ "src/js/*.js" ]
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
			doc: {
				files: {
					src: [
						"docs/js/*.js",
						"docs/qunit/*.js"
					]
				},
				options: {
					jshintrc: "docs/qunit/.jshintrc"
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
		cssmin: {
			release: {
				options: {
					banner: "<%= txt.banner.short %>"
				},
				files: [{
      				expand: true,
      				src: [ "dist/<%= pkg.version %>/*.css", "!dist/<%= pkg.version %>/*.min.css" ],
      				dest: "",
      				extDot: "last",
      				ext: ".min.css"
    			}]
			},
			latest: {
				options: {
					banner: "<%= txt.banner.short %>"
				},
				files: [{
      				expand: true,
      				src: [ "dist/latest/*.css", "!dist/latest/*.min.css"],
      				dest: "",
      				extDot: "last",
      				ext: ".min.css"
    			}]
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
		jekyll: {
			options: {
				src : "docs/",
				dest: "docs/_site"
			},
			latest: {
				options: {
					config: "docs/_config.yml,docs/_config.dev.yml"
				}
			},
			release: {
				options: {
					config: "docs/_config.yml"
				}
			}
		},
  		buildDBox: {
			latest_bootstrap: {
				options: {
					dest: "dist/latest/jtsage-datebox.bootstrap.js",
					includeBinding: true,
				},
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
			latest_jqueryui: {
				options: {
					dest: "dist/latest/jtsage-datebox.jqueryui.js",
					includeBinding: true,
				},
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
			latest_jqm: {
				options: {
					dest: "dist/latest/jtsage-datebox.jqm.js",
					includeBinding: true,
				},
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/jqm.js",
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
			main_jqueryui: {
				options: {
					dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqueryui.js",
					includeBinding: true,
				},
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
			main_jqm: {
				options: {
					dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqm.js",
					includeBinding: true,
				},
				files: [{
					expand: true,
					src: [
						"src/js/baseObject.js",
						"src/js/framework/jqm.js",
						"src/js/lib/*.js",
						"src/js/modes/*.js"
					],
				}]
			},
  		},
  		copy: {
  			web1: {
  				src: "src/css/sheet-bootstrap.php",
  				dest: "docs/theme/bootstrap/sheet.php"
  			},
      		web2: {
      			src: "src/css/sheet.php",
      			dest: "docs/theme/jqm/sheet.php"
      		},
      		web3: {
      			src: "src/css/sheet-jqueryui.php",
      			dest: "docs/theme/jqueryui/sheet.php"
      		},
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
		htmllint: {
			all: ["docs/_site/**/*.html"]
		},
		exec: {
			latest_make_css_jqm: {
				command: "/usr/bin/php src/css/sheet.php > dist/latest/jtsage-datebox.jqm.css"
			},
			latest_make_css_bootstrap: {
				command: "/usr/bin/php src/css/sheet-bootstrap.php > dist/latest/jtsage-datebox.bootstrap.css"
			},
			latest_make_css_jqueryui: {
				command: "/usr/bin/php src/css/sheet-jqueryui.php > dist/latest/jtsage-datebox.jqueryui.css"
			},
			main_make_css_jqm: {
				command: "/usr/bin/php src/css/sheet.php > dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqm.css"
			},
			main_make_css_bootstrap: {
				command: "/usr/bin/php src/css/sheet-bootstrap.php > dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.bootstrap.css"
			},
			main_make_css_jqueryui: {
				command: "/usr/bin/php src/css/sheet-jqueryui.php > dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqueryui.css"
			}

		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-git-committers" );
	grunt.loadNpmTasks( "grunt-jekyll" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-prettify" );
	grunt.loadNpmTasks( "grunt-html" );
	grunt.loadNpmTasks( "grunt-exec" );
	
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
		//"qunit",
		"clean:release",
		"clean:web",
		"buildDBox:main_jqm",
		"buildDBox:main_bootstrap",
		"buildDBox:main_jqueryui",
		"exec:main_make_css_jqm",
		"exec:main_make_css_bootstrap",
		"exec:main_make_css_jqueryui",
		"uglify:release",
		"cssmin:release",
		"committers",
		"copy:web1",
		"copy:web2",
		"copy:web3",
		"updatebuilder",
		"jekyll:release",
		"prettify",
		"makei18n"
	] );
	
	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"buildDBox:latest_jqm",
		"buildDBox:latest_bootstrap",
		"buildDBox:latest_jqueryui",
		"exec:latest_make_css_jqm",
		"exec:latest_make_css_bootstrap",
		"exec:latest_make_css_jqueryui",
		"uglify:latest",
		"cssmin:latest",
	]);
	

	grunt.registerTask( "i18n", "Build the i18n files", [
		"clean:i18n",
		"makei18n",
		"uglify:i18n"
	] );

	grunt.registerTask( "updatebuilder", "Update web builder sources", [ "clean:builder", "copy:builder1", "copy:builder2" ] );

	grunt.registerTask( "web", "Build the documentation site", ["clean:web", "copy:web1", "copy:web2", "copy:web3", "jekyll:release", "prettify"] );
	grunt.registerTask( "testweb", "Build the documentation site quickly", ["copy:web1", "copy:web2", "copy:web3", "jekyll:release"] );
	grunt.registerTask( "devweb", "Test the documentation site", ["copy:web1", "copy:web2", "jekyll:latest", "prettify"] );
	grunt.registerTask( "fulltest", "Deeply test the DateBox Suite", [ "jshint_reg"] );
	grunt.registerTask( "test", "Test the DateBox Suite", ["jshint_sane"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint_sane",
		"latest"
	] );
	
	

};
