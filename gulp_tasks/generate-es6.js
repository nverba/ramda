var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('es6:files', function () {
  return gulp.src(['src/**/*.js'], { base: "./src" })
    .pipe(replace(/(^var.*)('\);)/gm, "$1';"))
    .pipe(replace(/^var /gm, 'import '))
    .pipe(replace(/ = require\(/g, ' from '))
    .pipe(replace(/module\.exports =/g, "export default"))
    .pipe(gulp.dest('./es6'));
});

gulp.task('es6', ['es6:files'], function () {
  return gulp.src(['index.js'])
    .pipe(replace(/module.exports = {\s+/g, '  '))
    .pipe(replace(/};\s+/g, ''))
    .pipe(replace(/  /g, 'import '))
    .pipe(replace(/: require\(/g, ' from '))
    .pipe(replace(/\),?/g, ';'))
    .pipe(replace(/\/src\//g, '/'))
    .pipe(gulp.dest('./es6'));
});