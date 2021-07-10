// 'use strict';

import gulp from 'gulp';
// import iconfont from 'gulp-svgicons2svgfont';

gulp.task('createIconfont', function() {
  gulp.src([global.paths.iconfonts + '*.svg'])
    .pipe(iconfont({
      fontName: 'EmpireHall1'
    }))
    .on('glyphs', function(glyphs) {
      // CSS templating, e.g.
      console.log(glyphs);
    })
    // .pipe(gulp.dest(global.paths.fonts));
});

