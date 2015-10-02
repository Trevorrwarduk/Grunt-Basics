module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsdoc: {
            dist: {
                src: ['**/*'],
                options: {
                    destination: 'jsdoc'
                }
            }
        },
        jsbeautifier: {
            main: {
                files: ['**/*.js'],
                options: {}
            },
            one: {
                files: {
                    src: 'GruntFile.js'
                },
                options: {}
            },
        },
        jshint: {
            options: {
                '-W051': false,
                "newcap": false,
                globals: {
                    console: true,
                    module: true,
                    udef: true,
                }
            },
            main: {
                files: {
                    src: ['**/*.js']
                }
            },
            one: {
                files: {
                    src: 'GruntFile.js'
                }
            }
        },
        watch: {
            js: {
                files: ['GruntFile.js', '**/*.js'],
                tasks: ['validatejsone', 'formatjsone', 'FileChange'],
                options: {
                    event: ['changed'],

                    spawn: false
                }
            }
        },
        availabletasks: {
            tasks: {}
        }
    });

    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');



    grunt.registerTask('FileChange', 'The custom task for the watch event', function() {
        grunt.log.writeln('Waiting for more changes ...');
    });
    grunt.registerTask('default', ['watchjs']);
    grunt.registerTask('validatejsmain', ['jshint:main']);
    grunt.registerTask('validatejsone', ['jshint:one']);
    grunt.registerTask('formatjsmain', ['jsbeautifier:main']);
    grunt.registerTask('formatjsone', ['jsbeautifier:one']);
    grunt.registerTask('watchjs', ['watch:js']);
    grunt.registerTask('tasks', ['availabletasks']);


    // This captures the changed file for specific watch functions.
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config('jshint.one.files.src', filepath);
        grunt.config('jsbeautifier.one.files.src', filepath);
    });
};
