/*
 * grunt-csscc
 * https://github.com/shenjunru/grunt-csscc
 *
 * Copyright (c) 2014 Shen Junru, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var CleanCSS = require('clean-css/lib/clean');
    var path = require('path');

    function compress(source, options){
        try {
            var css = new CleanCSS(options);
            css.lineBreak = options.lineBreak;
            return css.minify(grunt.file.read(source));
        } catch (e) {
            grunt.log.error(e);
            grunt.fail.warn('css minification failed.');
            return '';
        }
    }

    grunt.registerMultiTask('csscc', 'Combine & Compress CSS files', function(){
        var options = this.options({
            selectorsMergeMode:  '*',
            keepSpecialComments: 0,
            processImport:       true,
            keepBreaks:          false,
            noAdvanced:          false,
            lineBreak:           '\n',
            banner:              '',
            root:                ''
        });

        this.files.forEach(function(file){
            var inputs = file.src.filter(function(filepath){
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            var result = inputs.map(function(filepath){
                var _options = Object.create(options);
                _options.relativeTo = path.dirname(filepath);
                _options.target = file.dest;
                return compress(filepath, _options);
            });

            if (options.banner) {
                result.unshift(options.banner, options.lineBreak);
            }

            grunt.file.write(file.dest, result.join(''));
            grunt.log.writeln('File ' + file.dest + ' created.');
        });
    });
};
