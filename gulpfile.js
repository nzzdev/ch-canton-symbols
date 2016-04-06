var gulp = require('gulp')
var cssBase64 = require('gulp-css-base64');

gulp.task('default', function () {
    return gulp.src('symbols/13x13-symbols.css')
        .pipe(cssBase64())
        .pipe(gulp.dest('dist'));
});
