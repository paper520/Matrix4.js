'use strict';

let banner = '/*!\n' +
  '*  @license Matrix4.js v<%= pkg.version %>\n' +
  '* (c) 2019 yelloxing <%= pkg.repository.url %>\n' +
  '* License: <%= pkg.license %>\n' +
  '*/\n';

// 打包文件
const source = [

  'src/tool.js',
  'src/basic.calc.js',
  'src/transform.js',
  'src/move.js',
  'src/rotate.js',
  'src/scale.js'

];

module.exports = function (grunt) {

  // 独立配置文件
  const jshint_options = grunt.file.readJSON('jshint.json');

  /*配置插件*/
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    insert: { // 合并插入
      options: {
        banner: banner,
        link: ""
      },
      target: {
        options: {
          separator: '// @CODE build.js inserts compiled Matrix4.js here',
          target: 'src/index.js'
        },
        files: {
          'build/Matrix4.js': source
        }
      }
    },
    jshint: { //语法检查
      options: jshint_options,
      target: 'build/Matrix4.js'
    },
    uglify: { //压缩代码
      options: {
        banner: banner
      },
      target: {
        options: {
          mangle: true
        },
        files: [{
          'build/Matrix4.min.js': ['build/Matrix4.js']
        }]
      }
    }
  });

  /*加载插件*/
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-plug-insert');

  /*注册任务*/
  grunt.registerTask('release', ['insert:target', 'jshint:target', 'uglify:target']);
};
