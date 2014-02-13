# grunt-csscc v0.1.0

> Combine & Compress CSS files.



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csscc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csscc');
```



## Run Task
_Run this task with the `grunt csscc` command._

Task targets, files and options may be specified according to the grunt
[Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Files are compressed with [clean-css](https://github.com/GoalSmashers/clean-css).

## Options

* `banner` - header of the compressed source, with a line break in between.
* `selectorsMergeMode` - `ie8` for IE8 compatibility mode, `*` for merging all (default)
* `keepSpecialComments` - `0` for removing all (default), `1` for keeping first one only, `*` for keeping all
* `keepBreaks` - whether to keep line breaks (default is false)
* `processImport` - whether to process `@import` rules
* `noAdvanced` - set to true to disable advanced optimizations - selector & property merging, reduction, etc. (default is false)
* `noRebase` - whether to skip URLs rebasing (default is false)
* `root` - path to resolve absolute `@import` rules and rebase relative URLs
* `lineBreak` - line break (default is '\n')

## Usage Example

```js
csscc: {
  dist: {
    options: {
      banner: '/* you banner here */'
    },
    files: {
      'path/to/output.css': ['path/to/input_one.css', 'path/to/input_two.css']
    }
  }
}
```


## Release History

 * 2014-02-13   v0.1.0   first stable version.
