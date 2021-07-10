'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import sass from 'gulp-sass';

import gulpPostcss from 'gulp-postcss';
import cssDeclarationSorter from 'css-declaration-sorter';

import sourcemaps from 'gulp-sourcemaps';
import cssNano from 'gulp-cssnano';
// import cleanCSS from 'gulp-clean-css';
// 
import rename from 'gulp-rename';
import gutil from 'gulp-util';
import gcmq from 'gulp-group-css-media-queries'; 

const paths = global.paths;

const prepareDistCss = () => {
  gulp.src(paths.dev.sass + '*.scss')
    .pipe(sass()).on('error', function(error) {
      gutil.log(error.toString());
      this.emit('end');
    })
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions','safari >= 10', 'ie >= 11', '> 1%'],
      cascade: false
    }))
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'alphabetically'})]))
    .pipe(cssNano({
	    autoprefixer: {overrideBrowserslist: ['last 3 versions','safari >= 10', 'ie >= 11', '> 1%']},
        reduceIdents: true,
	    zindex: false
    }))
    // .pipe(rename({
    //     suffix: '.min'
    // }))
    .pipe(gulp.dest(paths.dist+'/styles'));
        
  return gulp.src(paths.dev.cssVend + '/**/*', {
        dot: true})
      .pipe(gulpPostcss([cssDeclarationSorter({order: 'alphabetically'})]))
      .pipe(cssNano({
	      autoprefixer: {overrideBrowserslist: ['last 3 versions','safari >= 10', 'ie >= 11', '> 1%']},
          reduceIdents: true,
	      zindex: false
      }))
        //.pipe(rename({
        //    suffix: '.min'
        //}))
      .pipe(gulp.dest(paths.dist+'/styles'));
};

// copy CSS files from dev to src/styles
gulp.task('vendorCss', () => {
  return gulp.src(
    paths.dev.cssVend + '/**/*', {
      dot: true})
    .pipe(gulp.dest(paths.build.css));
});

// compile SASS with sourcemaps and copy dev CSS
gulp.task('sass', () => {

  return gulp.src(paths.dev.sass + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', function(error) {
      gutil.log(error.toString());
      this.emit('end');
    })
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions','safari >= 10', 'ie >= 11', '> 1%'],
      cascade: false
    }))
    .pipe(gcmq())
    // .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})]))
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'alphabetically'})]))
    
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build.css));
});

// compile SASS (excludes sourcemaps)
gulp.task('sass_dist', () => {
    // prepareDevCss();

    return prepareDistCss();
});
