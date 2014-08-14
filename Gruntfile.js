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
			doc: {
				files: {
					src: [ "docs/js/*.js", "docs/qunit/*.js" ]
				},
				options: {
					jshintrc: "docs/qunit/.jshintrc"
				}
			},
			grunt: {
				files: {
					src: [ "Gruntfile.js" ]
				},
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		clean: {
			latest: ["dist/latest/"],
			release: ["dist/<%= pkg.version %>/"]
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
						"js/jqm-datebox.mode.datebox.js",
						"js/jqm-datebox.mode.durationbox.js"
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
						"js/jqm-datebox.mode.durationflipbox.js"
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
			latest: {
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
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin");
	
	grunt.registerTask( "release", [
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
		"cssmin:release"
	]);
	
	grunt.registerTask( "latest", [
		"clean:latest",
		"concat:lat_main",
		"copy:latest",
		"copy:latest_css",
		"uglify:latest",
		"cssmin:latest"
	]);

	grunt.registerTask( "test", ["jshint", "qunit"] );

	grunt.registerTask( "default", [ "jshint", "qunit", "latest" ]);
	

};
