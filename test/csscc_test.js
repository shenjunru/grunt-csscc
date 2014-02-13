'use strict';

var grunt = require('grunt');

exports.csscc = {
  compress: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/compress.css');
    var result = grunt.file.read('tmp/compress.css');
    test.equal(expect, result, 'should concat and minify an array of css files in order using clean-css');

    test.done();
  },
  empty: function(test) {
    test.expect(1);

    test.equal('', grunt.file.read('tmp/idontexist.css'), 'Empty minified file should not exist');

    test.done();
  },
  with_banner: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/with-banner.css');
    var result = grunt.file.read('tmp/with-banner.css');
    test.equal(expect, result, 'should concat, minify and prefix banner');

    test.done();
  },
  remove_first_comment: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/input_bannered.css');
    var result = grunt.file.read('tmp/remove_first_comment.css');
    test.equal(expect, result, 'should minify and replace banner');

    test.done();
  },
  inline_import: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/inline_import.css');
    var result = grunt.file.read('tmp/inline_import.css');
    test.equal(expect, result, 'should inline @import');

    test.done();
  },
  resolve_url: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/resolve_url.css');
    var result = grunt.file.read('tmp/resolve_url.css');
    test.equal(expect, result, 'should resolve url()');

    test.done();
  }
};
