var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var paths = require('./helpers/paths.js');

require('./handlebars.js');
require('./less.js');
require('./copy.js');
require('./webpack.js');

function watchTask(glob, task) {
  var options = {
    name: ' watch:' + task,
    verbose: true
  };
  return watch(glob, options, function(events, done) {
    gulp.start(task);
  });
}

gulp.task('watch', ['handlebars', 'less', 'copyHtml', 'copyContent', 'copyJs'], function() {
  livereload.listen();

  gulp.start('webpackWatch');

  watchTask(paths.src.templates, 'handlebars');
  watchTask(paths.src.less, 'less');
  watchTask(paths.src.html, 'copyHtml');
  watchTask([paths.src.content + '**/*.*', '!**/*.less'], 'copyContent');
});
