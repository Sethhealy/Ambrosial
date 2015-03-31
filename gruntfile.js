module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 4000,
					base: '',
					hostname: 'localhost',
					livereload: 9000
				}
			}
		},
		wiredep: {
			target: {
				src: ['index.html']
			}
		},

		watch: {
			options: {
				livereload: {port: 9000}
			},
			css:{
				files: 'css/**/*.css'
			},
			html:{
				files: '**/*.html'
			},
			js:{
				files: 'js/**/*.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-wiredep');


	grunt.registerTask('serve', ['wiredep', 'connect','watch']);
};
