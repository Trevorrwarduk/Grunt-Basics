module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            docLayout: {
                flatten: true,
                src: ['jsDuckConfig/layout/css.css'],
                dest: 'unTwardDocs/'
            },
            docIcon: {
                flatten: true,
                src: ['jsDuckConfig/layout/icon.png'],
                dest: 'unTwardDocs/'
            },
            docImage: {
                flatten: true,
                src: ['jsDuckConfig/layout/untward.png'],
                dest: 'unTwardDocs/'
            },
            favicon: {
                flatten: true,
                src: ['favicon.ico'],
                dest: 'unTwardDocs/'
            }
        },
        // Need to install jsduck "sudo gem install jsduck" & Ruby if not installed
        jsduck: {
            generate: {
                src: ['Gruntfile.js', 'app/**/*.js', '!app/**/index.js'],
                dest: 'unTwardDocs/',
                options: {
                    config: 'jsDuckConfig/jsduck.json'
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
    grunt.loadNpmTasks('grunt-jsduck');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('FileChange', 'The custom task for the watch event', function() {
        grunt.log.writeln('Waiting for more changes ...');
    });
    grunt.registerTask('docs', ['jsduck', 'copy:docLayout', 'copy:docIcon', 'copy:docImage', 'copy:favicon']);
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
