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
					src: [ "src/js/*.js" ]
				},
				options: {
					jshintrc: "src/js/.jshintrc"
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
						"docs/qunit/*.js",
						"docs/doc/3rd/backbonerequire/*.js"
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
			latest: ["dist/latest/"],
			release: ["dist/<%= pkg.version %>/"],
			i18n: ["dist/i18n"]
		},
		concat: {
			options: {
				stripBanners: true,
				banner: "<%= txt.banner.long %>",
			},
			latest_jqm: {
				src: [
						"build/wrap.begin",
						"src/js/.core.js",
						"src/js/base.jqm.js",
						"src/js/mode.*.js",
						"!src/js/.mode.custombox.js",
						"!src/js/mode.customflip.js",
						"build/wrap.end"
				],
				dest: "dist/latest/jtsage-datebox.jqm.js"
			},
			latest_bootstrap: {
				src: [
						"src/js/.core.js",
						"src/js/base.bootstrap.js",
						"src/js/mode.*.js",
						"!src/js/mode.custombox.js",
						"!src/js/mode.customflip.js",
				],
				dest: "dist/latest/jtsage-datebox.bootstrap.js"
			},
			main_jqm: {
				src: [
						"build/wrap.begin",
						"src/js/.core.js",
						"src/js/base.jqm.js",
						"src/js/mode.*.js",
						"!src/js/.mode.custombox.js",
						"!src/js/mode.customflip.js",
						"build/wrap.end"
				],
				dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqm.js"
			},
			main_bootstrap: {
				src: [
						"src/js/.core.js",
						"src/js/base.bootstrap.js",
						"src/js/mode.*.js",
						"!src/js/mode.custombox.js",
						"!src/js/mode.customflip.js",
				],
				dest: "dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.bootstrap.js"
			}
		},
		copy: {
			latest_css: {
				options: {
					process: function (content) {
						var texty = grunt.config("txt");
						return content.replace(
							/^...jQuery-Mobile-DateBox.../,
							texty.banner.long
						);
					}
				},
				files: [ {
					expand: true,
					cwd: "css/",
					src: ["*.css"],
					dest: "dist/latest/",
				} ]
			},
			release_css: {
				options: {
					process: function (content) {
						var texty = grunt.config("txt");
						return content.replace(
							/^...jQuery-Mobile-DateBox.../,
							texty.banner.long
						);
					}
				},
				files: [ {
					expand: true,
					cwd: "css/",
					src: ["*.css"],
					dest: "dist/<%= pkg.version %>/",
					rename: function(dest, src) {
						return dest + src.replace(/^jqm-datebox/, "jqm-datebox-<%= pkg.version %>");
					}
				} ]
			}
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
			dev2: {
				options: {
					config: "docs/_config.yml,docs/_config.mdev.yml"
				}
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
		watch: {
			scripts: {
				files: [ "js/*.js" ],
				tasks: [ "jshint:js" ]
			},
			web: {
				files: [ 
					"docs/doc/*.md",
					"docs/api/*.md",
					"docs/index.html",
					"docs/_layouts/*.html",
					"docs/_includes/*.html",
					"docs/qunit/index.php",
					"docs/theme/*.php",
					"docs/builder/*.php"
				],
				tasks: [ "jekyll:latest", "prettify" ]
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
			main_make_css_jqm: {
				command: "/usr/bin/php src/css/sheet.php > dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.jqm.css"
			},
			main_make_css_bootstrap: {
				command: "/usr/bin/php src/css/sheet-bootstrap.php > dist/<%= pkg.version %>/jtsage-datebox-<%= pkg.version %>.bootstrap.css"
			}

		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
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
		"jshint:js"
	]);
	
	grunt.registerTask( "jshint_sane", "Run jsHint with sane values", [
		"jshint:js_sane",
	]);
		
	
	grunt.registerTask( "release", "Build a release version of DateBox", [
		"jshint_sane",
		//"qunit",
		"clean:release",
		"concat:main_jqm",
		"concat:main_bootstrap",
		"exec:main_make_css_jqm",
		"exec:main_make_css_bootstrap",
		"uglify:release",
		"cssmin:release",
		"committers",
		"jekyll:release",
		"prettify",
		"makei18n"
	] );
	
	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"concat:latest_jqm",
		"concat:latest_bootstrap",
		"exec:latest_make_css_jqm",
		"exec:latest_make_css_bootstrap",
		"uglify:latest",
		"cssmin:latest",
	]);
	

	grunt.registerTask( "i18n", "Build the i18n files", [
		"clean:i18n",
		"makei18n",
		"uglify:i18n"
	] );

	grunt.registerTask( "web", "Build the documentation site", ["jekyll:release", "prettify"] );
	grunt.registerTask( "devweb", "Test the documentation site", ["jekyll:latest", "prettify"] );
	grunt.registerTask( "devweb2", "Test the documentation site", ["jekyll:dev2", "prettify"] );
	grunt.registerTask( "fulltest", "Deeply test the DateBox Suite", [ "jshint_reg"] );
	grunt.registerTask( "test", "Test the DateBox Suite", ["jshint_sane"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint_sane",
		"latest"
	] );
	
	

};
