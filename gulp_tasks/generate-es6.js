var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('es6', function () {
  return gulp.src(['src/**/*.js'], { base: "./src" })
    .pipe(replace(/^var /gm, 'import '))
    .pipe(replace(/ = require\(/g, ' from '))
    .pipe(replace(/'\);/g, "';"))
    .pipe(replace(/module\.exports =/g, "export default"))
    .pipe(gulp.dest('./es6'));
});


