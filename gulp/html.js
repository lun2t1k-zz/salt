'use strict';

import gulp from 'gulp';
import html from 'gulp-file-include';

const paths = global.paths;

gulp.task('html', () => {
  gulp.src(paths.dev.html + '**/*.html');
});

gulp.task('html:build', function() {
  return gulp.src([paths.dev.html + '*.html'])
    .pipe(html({
      prefix: '@@'
    }))
    .pipe(gulp.dest(paths.build.buildPath));
});
