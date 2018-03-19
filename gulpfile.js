// Get Gulp packages
var gulp = require('gulp');
var babel = require('gulp-babel');

// Packages Declaration
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// Gulp Default tasks
gulp.task('default', ['check', 'clean', 'dev sass', 'dev scripts', 'dist scripts', 'browser-sync', 'watch']);

// Gulp Watch function
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['dev sass']);
  gulp.watch('js/*.js', ['dev scripts', 'dist scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
})

// SASS Compile + Minify
gulp.task('dev sass', function() {
  return gulp.src(
    [
    'node_modules/bootstrap-grid/dist/grid.min.css',
    'scss/example.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
           browsers: ['last 5 versions'],
           cascade: false
       }))
    .pipe(sass().on('error', gutil.log))
    .pipe(cleancss())
    .pipe(concat('scrambleDev.css'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});
// Concat + Minify .js
gulp.task('dist scripts', function() {
    return gulp.src(
      [
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      'js/scramble.js'
      ])
      // .pipe(babel({
      //   presets: [
      //     'es2015'
      //   ]
      // }).on('error', gutil.log))
      .pipe(sourcemaps.init())
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('scramble.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task('dev scripts', function() {
    return gulp.src(
      [
      'js/example.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('scrambleDev.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
// Clear build folder
gulp.task('clean', function() {
    return del.sync(['dist/*']);
});
// browser-sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Gulp run test
gulp.task('check', function() {
  console.log('Tasks running..');
});
