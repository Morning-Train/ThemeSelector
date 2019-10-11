module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'concurrent']);

    grunt.registerTask('build', ['clean', 'copy', 'styles', 'scripts']);

    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('scripts', ['jshint']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 'shell:bower',

    grunt.initConfig({
        // shell: {
        //     // install bower packages
        //     bower: {
        //         command: 'node_modules/bower/bin/bower install'
        //     },
        //     server: {
        //         command: 'cd build; php -S localhost:3005'
        //     }
        // },

        clean: {
            build: {
                src: ['build']
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*'],
                    dest: 'build/img'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.html'],
                    dest: 'build'
                }]
            },
            json: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.json'],
                    dest: 'build'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['**/*.js'],
                    dest: 'build/js'
                }]
            },
        },

        sass: {
            options: {
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'build/css/content.css' : 'src/scss/content.scss',
                    'build/css/popup.css' : 'src/scss/popup.scss'
                }
            }
        },


        // Scripts
        jshint: {
            options: {
                reporterOutput: '',
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: false,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                devel: true,
                nonbsp: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: false,
                unused: true,
                strict: false,
                maxparams: 4,
                maxdepth: 4,
                maxlen: 120,
                trailing: true,
                globals: {
                    angular: true,
                    console: false,
                    require: false,
                    data: false,
                    $: false,
                    jQuery: false,
                    google: false
                }
            },
            grunt: {
                options: {
                    node: true
                },
                src: ['Gruntfile.js']
            },
            build: {
                options: {
                    browser: true
                },
                src: [
                'src/js/**/*.js'
                ]
            }
        },
        concat: {
            build: {
                options: {
                    separator: ';\n'
                },
                src: [
                'src/js/**/*.js'
                ],
                dest: 'build/js/scripts.js'
            }
        },
        uglify: {
            options: {
                beautify: false,
                compress: {
                    global_defs: {
                        'DEBUG': false
                    },
                    dead_code: true
                }
            },
            my_target: {
                files: {
                    'build/js/scripts.js': ['src/js/js.js']
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // 'shell:server',
        // Watch
        watch: {
            sass: {
                files: ['src/scss/**/*.scss'],
                // runs the task `sass` whenever any watched file changes 
                tasks: ['sass']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['scripts'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            php: {
                files: ['src/php/**/*.php'],
                tasks: ['copy:php'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            fonts: {
                files: ['src/fonts/**/*'],
                tasks: ['copy:fonts'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            images: {
                files: ['src/img/**/*'],
                tasks: ['copy:images'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            json: {
                files: ['src/**/*'],
                tasks: ['copy:json'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

};