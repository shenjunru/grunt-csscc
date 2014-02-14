/*
 * grunt-csscc
 * https://github.com/shenjunru/grunt-csscc
 *
 * Copyright (c) 2014 Shen Junru, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['tmp']
        },

        // Configuration to be run (and then tested).
        csscc: {
            compress: {
                files: {
                    'tmp/compress.css': [
                        'test/fixtures/input_one.css',
                        'test/fixtures/input_two.css'
                    ]
                }
            },
            empty: {
                files: {
                    'tmp/idontexist.css': [
                        'test/fixtures/idontexist.css'
                    ]
                }
            },
            with_banner: {
                options: {
                    banner: '/* module name - my awesome css banner */'
                },
                files: {
                    'tmp/with-banner.css': [
                        'test/fixtures/input_one.css',
                        'test/fixtures/input_two.css'
                    ]
                }
            },
            remove_first_comment: {
                options: {
                    banner: '/* custom banner */',
                    keepSpecialComments: 0
                },
                files: {
                    'tmp/remove_first_comment.css': [
                        'test/fixtures/input_bannered.css'
                    ]
                }
            },
            inline_import: {
                files: {
                    'tmp/inline_import.css': [
                        'test/fixtures/input_inline_import.css',
                        'test/fixtures/inner/input_inline_import.css'
                    ]
                }
            },
            resolve_url: {
                files: {
                    'tmp/resolve_url.css': [
                        'test/fixtures/input_resolve.css'
                    ]
                }
            },

            clean_css_import: {
                files: {
                    'tmp/clean_css_import.css': [
                        'test/fixtures/clean_css_import/test.css'
                    ]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'csscc', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
