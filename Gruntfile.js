'use strict';

module.exports = function(grunt) {

        // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        cafemocha: 'grunt-cafe-mocha'
    });
    // Configurable paths for the application
    var appConfig = {
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
/*        , env : {
            dev : {
              src : '../devops/env.json'
            }
        }*/
        , cafemocha: {
            unit: {
                src: 'test/*_unit.js',
                options: {
                    ui: 'tdd'
                    , reporter: 'spec'
                    , bail: false
                }
            }
            , integration: {
                src: 'test/*_integration.js',
                options: {
                    ui: 'tdd'
                    , reporter: 'spec'
                    , bail: false
                }
            }
        }
        , clean: {
            js: [ 'dist' ]
        }
        , jshint: {
                // define the files to lint
                files: ['Gruntfile.js', 'src/**/*.js']
                // configure JSHint (documented at http://www.jshint.com/docs/)
                , options: {
                // more options here if you want to override JSHint defaults
                 globals: {
                  jQuery: true,
                  console: true,
                  module: true
                }
            }
        }
        , copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/',  src: ['**'], dest: 'dist/'},
                    { expand: true, cwd: './',  src: ['package.json'], dest: 'dist/'}
                ]
            }
        }
        , watch: {
                src: {
                    files: ['src/**/*.js'],
                    tasks: ['clean', 'copy'],
                    options: {
                            spawn: false
                    }
                }
        }

    });

    // Default task(s).
    grunt.registerTask('default', [ 'copy', 'watch', 
        'jshint', 'clean', 'cafemocha:unit' ]);

    grunt.registerTask('test', [
        //'env:dev'
        'cafemocha:unit'
        , 'cafemocha:integration'
      ]);

    grunt.registerTask('build', [
        //'env:dev'
        'clean'
        , 'copy'
        , 'cafemocha:unit'
      ]);

};
