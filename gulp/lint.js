'use strict';

import gulp from 'gulp';
import cache from 'gulp-cached';
import eslint from 'gulp-eslint';
import sassLint from 'gulp-sass-lint';
import gutil from 'gulp-util';

const paths = global.paths;

// lint JS
gulp.task('lint_js', () => {
  return gulp.src(paths.dev.js + '**/*')
    .pipe(cache('lint_js'))
    .pipe(eslint().on('error', function(error) {
      gutil.log(error.toString());
      this.emit('end');
    }))
    .pipe(eslint.format());
});

// lint SASS
gulp.task('lint_sass', () => {
  return gulp.src(paths.dev.sass + '**/*')
    .pipe(cache('lint_sass'))
    .pipe(sassLint().on('error', function(error) {
      gutil.log(error.toString());
      this.emit('end');
    }))
    .pipe(sassLint.format());
});

// lint all the things!
gulp.task('lint', ['lint_js', 'lint_sass']);
