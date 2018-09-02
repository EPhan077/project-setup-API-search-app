var gulp = require('gulp');
var sass = require('gulp-sass');
var scss = './scss/*.scss';
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
})

gulp.task('scss', function() {
  return gulp.src(scss)
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream:true
  }))
})


gulp.task('watch', function() {
    gulp.watch(scss, ['scss'])
})

gulp.task('browser-sync', function() {
          browserSync.init({
              server: {
                  baseDir: "./"
              }
          })
})

gulp.task('watch', ['browser-sync', 'scss'], function() {
    gulp.watch(scss, ['scss'])
})