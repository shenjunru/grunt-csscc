/*
 * grunt-csscc
 * https://github.com/shenjunru/grunt-csscc
 *
 * Copyright (c) 2014 Shen Junru, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var CleanCSS = require('clean-css');
    var path = require('path');

    function compress(source, options){
        try {
            var cc = new CleanCSS(options);
            cc.lineBreak = options.lineBreak;

            var result = cc.minify(grunt.file.read(source));

            if (options.debug) {
                grunt.log.writeln('Original: %d bytes', cc.stats.originalSize);
                grunt.log.writeln('Minified: %d bytes', cc.stats.minifiedSize);
                grunt.log.writeln('Efficiency: %d%', ~~(cc.stats.efficiency * 10000) / 100.0);
                grunt.log.writeln('Time spent: %dms', cc.stats.timeSpent);
            }

            cc.errors.forEach(function(message) {
                grunt.log.error(message);
            });
            cc.warnings.forEach(function(message) {
                grunt.fail.warn(message);
            });

            return result;
        } catch (e) {
            grunt.log.error(e);
            grunt.fail.warn('css minification failed.');
            return '';
        }
    }

    grunt.registerMultiTask('csscc', 'Combine & Compress CSS files', function(){
        var options = this.options({
            compatibility:       '*',
            keepSpecialComments: 0,
            processImport:       true,
            keepBreaks:          false,
            noAdvanced:          false,
            debug:               false,
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
