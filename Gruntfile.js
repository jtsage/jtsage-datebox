module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		txt: {
			copyYear: grunt.template.today( "UTC:yyyy" ),
			banner : {
				long: [
					"/*",
					" * jQuery-Mobile-DateBox <%= version %>",
					" * Date: " + grunt.template.today( "UTC:ddd mmm d yyyy HH:MM:ss Z" ),
					" * http://dev.jtsage.com/jQM-DateBox/",
					" * https://github.com/jtsage/jquery-mobile-datebox",
					" *",
					" * Copyright 2010, <%= txt.copyYear %> JTSage. and other contributors",
					" * Released under the MIT license.",
					" * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt",
					" *",
					" */",
					"" ].join( grunt.util.linefeed ),
				short: "/*! jQuery-Mobile-DateBox <%= version %> |" + 
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
					src: [ "js/*.js" ]
				},
				options: {
					jshintrc: "js/.jshintrc"
				}
			},
			js_sane: {
				files: {
					src: [ "js/*.js" ]
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
			lat_main: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.*.js"
				],
				dest: "dist/latest/jqm-datebox.all.js"
			},
			lat_amd: {
				src: [
						"build/wrap.begin",
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.*.js",
						"build/wrap.end"
				],
				dest: "dist/latest/jqm-datebox.all.amd.js"
			},
			ver_main: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.*.js",
						"!js/jqm-datebox.mode.customflip.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.all.js"
			},
			ver_extra: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.*.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.allextra.js"
			},
			ver_comp_datebox: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.datebox.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.comp.datebox.js"
			},
			ver_comp_calbox: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.calbox.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.comp.calbox.js"
			},
			ver_comp_flipbox: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.flipbox.js",
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.comp.flipbox.js"
			},
			ver_comp_slidebox: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.slidebox.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.comp.slidebox.js"
			},
			ver_comp_customflip: {
				src: [
						"js/jqm-datebox.core.js",
						"js/jqm-datebox.mode.customflip.js"
				],
				dest: "dist/<%= pkg.version %>/jqm-datebox-<%= pkg.version %>.comp.customflip.js"
			}
		},
		copy: {
			release: {
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
					cwd: "js/",
					src: ["*.js"],
					dest: "dist/<%= pkg.version %>/",
					rename: function(dest, src) {
						return dest + src.replace(/^jqm-datebox/, "jqm-datebox-<%= pkg.version %>");
					}
				} ]
			},
			latest: {
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
					cwd: "js/",
					src: ["*.js"],
					dest: "dist/latest/",
				} ]
			},
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
				files: {
					"dist/<%= pkg.version %>/jqm-datebox<%= pkg.version %>.min.css": [
						"css/jqm-datebox.css"]
				}
			},
			latest: {
				options: {
					banner: "<%= txt.banner.short %>"
				},
				files: {
					"dist/latest/jqm-datebox.min.css": [
						"css/jqm-datebox.css"]
				}
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
		"qunit",
		"clean:release",
		"concat:ver_main",
		"concat:ver_extra",
		"concat:ver_comp_datebox",
		"concat:ver_comp_calbox",
		"concat:ver_comp_flipbox",
		"concat:ver_comp_slidebox",
		"concat:ver_comp_customflip",
		"copy:release",
		"copy:release_css",
		"uglify:release",
		"cssmin:release",
		"committers",
		"jekyll:release",
		"prettify",
	] );
	
	grunt.registerTask( "latest", "Build a working version of DateBox (no testing)", [
		"clean:latest",
		"concat:lat_main",
		"concat:lat_amd",
		"copy:latest",
		"copy:latest_css",
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
	grunt.registerTask( "fulltest", "Deeply test the DateBox Suite", [ "jshint_reg", "qunit"] );
	grunt.registerTask( "test", "Test the DateBox Suite", ["jshint_sane", "qunit"] );

	grunt.registerTask( "default", "Test and Build working version", [
		"jshint_sane",
		"latest"
	] );
	
	

};
