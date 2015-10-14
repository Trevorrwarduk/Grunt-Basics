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
            single: {
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
            single: {
                files: {
                    src: 'GruntFile.js'
                }
            }
        },
        watch: {
            js: {
                files: ['GruntFile.js', '**/*.js'],
                tasks: ['validatejssingle', 'formatjssingle', 'FileChange'],
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


    grunt.registerTask('FileChange', 'The watch event', function() {
        grunt.log.writeln('Waiting for changes ...');
    });
    grunt.registerTask('docs', ['jsduck', 'copy:docLayout', 'copy:docIcon', 'copy:docImage', 'copy:favicon']);
    grunt.registerTask('default', ['watchjs']);
    grunt.registerTask('validatejsmain', ['jshint:main']);
    grunt.registerTask('validatejssingle', ['jshint:single']);
    grunt.registerTask('formatjsmain', ['jsbeautifier:main']);
    grunt.registerTask('formatjssingle', ['jsbeautifier:single']);
    grunt.registerTask('watchjs', ['watch:js']);
    grunt.registerTask('tasks', ['availabletasks']);


    // This captures the changed file for specific watch functions.
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config('jshint.single.files.src', filepath);
        grunt.config('jsbeautifier.single.files.src', filepath);
    });
};
