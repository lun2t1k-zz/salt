'use strict';

import gulp from 'gulp';
import path from 'path';
import util from 'gulp-util';
import browserSync from 'browser-sync';

const reload = browserSync.reload;
const paths = global.paths;

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}

// Watch for changes
gulp.task('watch', ['lint_js', 'scripts', 'sass', 'html:build','img'], () => {
  browserSync({
    notify: false,
    // Allow scroll syncing across breakpoints
    // scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // tunnel: true,
    server: 'src/build',
    port: 3000
  });

  gulp.watch([paths.dev.js + '**/*.js'], ['lint_js', 'scripts', reload]).on('change', logChanges);
  gulp.watch([paths.dev.sass + '**/*.scss'], ['sass', reload]).on('change', logChanges);
  gulp.watch([paths.dev.cssVend + '**/*.css'], ['vendorCss', reload]).on('change', logChanges);
  gulp.watch([paths.dev.img + '**/*'], ['img', reload]).on('change', logChanges);
  gulp.watch([paths.dev.html + '**/*.html'], ['html:build', reload]).on('change', logChanges);
});
