module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),

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
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );

	grunt.registerTask( "test", [ "jshint" ]);

	grunt.registerTask( "default", [ "jshint" ]);

};
