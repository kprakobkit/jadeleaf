var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var livereloadMiddleware = function (connect, options) {
  return [
    lrSnippet,
    connect.static(options.base[0]),
    connect.directory(options.base[0])
  ];
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      client: {
        options: {
          port: 9000,
          base:'target/',
          middleware: livereloadMiddleware
        }
      }
    },
    watch: {
      index: {
        files: ['app/index.html'],
        tasks:['copy'],
        options: {
          livereload:LIVERELOAD_PORT
        }
      },
      css: {
        files: ['app/css/*.scss'],
        tasks:['sass'],
        options: {
          livereload:LIVERELOAD_PORT
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'target/main.css':'app/css/style.scss'
        }
      }
    },
    copy: {
      main: {
        src: 'app/index.html',
        dest: 'target/index.html',
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('preview', ['connect:client','watch']);
};
