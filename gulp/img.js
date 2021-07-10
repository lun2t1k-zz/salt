'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import jpgcompress from 'imagemin-jpeg-recompress';
// import svgSprite from 'gulp-svg-sprite';
// import clean from 'gulp-clean';
import svgmin from 'gulp-svgmin';
// import pngSprite from 'png-sprite';
// import replace from 'gulp-replace';
import svgcss from 'gulp-svg-css';

const paths = global.paths;

gulp.task('img', () => {
    return gulp.src(paths.dev.img + '**/**')
        .pipe(imagemin(
            [pngquant(), jpgcompress(), svgmin()],
            {
                progressive: true,
                verbose: true,
                interlaced: true
            }
        ))
        .pipe(gulp.dest(paths.build.img));
});

// gulp.task('spritePNG', () => {
//   return gulp.src('./app/vendor/png/input/**.png')
//     .pipe(pngSprite.gulp({
//       cssPath: 'sprites.css',
//       pngPath: 'sprites.png',
//       namespace: 'sprites'
//     }))
//     .pipe(gulp.dest('./app/vendor/png/output'))
// });

// // Sptite SVG
// gulp.task('spriteSVG', () => {
//   return gulp.src('./app/vendor/svg/sprite/input/**.svg')
//     .pipe(svgSprite({
//       mode                : {
//         css             : {     // Activate the «css» mode
//           render      : {
//             css     : true  // Activate CSS output (with default options)
//           }
//         }
//       }
//     }))
//     .pipe(gulp.dest('./app/vendor/svg/sprite/output'));
// });

gulp.task('inlineSvg', function() {
  return gulp.src(paths.dev.svg + 'input/**/*.svg')
    .pipe(svgmin({
      plugins: [
        {removeViewBox: false},
        {removeUnknownsAndDefaults: false},
        {removeComments: true},
        {minifyStyles: false},
        {removeTitle: true},
        {removeDesc: true},
        {removeUselessDefs: true},
        {convertTransform: false}
      ]
    }))
    // .pipe(replace('#', '%23'))
    // .pipe(replace('"', "'"))
    .pipe(svgcss({
      fileName: 'icons',
      cssPrefix: 'bg-',
      addSize: false
    }))
    // .pipe(replace('-_', "_"))
    .pipe(gulp.dest(paths.dev.svg));
});

gulp.task('minifySvg', function() {
  return gulp.src(paths.dev.svg + 'input/**/*.svg')
    .pipe(svgmin({
      plugins: [
        {removeUnknownsAndDefaults: false},
        {removeTitle: true},
        {convertTransform: false}
      ]
    }))
    .pipe(gulp.dest(paths.dev.svg));
});

