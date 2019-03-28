/* eslint-env node */


/*
THIS FILE IS BROKEN!!!!  MOVING TO NPM TO BUILD!!!
*/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON( "package.json" ),
		clean : {
			builder : ["node_builder/src/<%= pkg.version %>/"]
		},
		copy : {
			builder1 : {
				expand : true,
				cwd    : "src/js",
				src    : "**/*.js",
				dest   : "node_builder/src/<%= pkg.version %>/js/"
			},
		},
		


	});

	

	grunt.registerTask( "release", "Build a release version of DateBox", [
		"updatebuilder",
	] );





	grunt.registerTask( "updatebuilder", "Update web builder sources", [
		"clean:builder",
		"copy:builder1"
	] );


};
