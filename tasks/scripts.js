var gulp = require('gulp')
var rsync = require('rsyncwrapper')
var concatJs = require('gulp-concat')

gulp.task('global-js', function () {
  rsync({
    src: '_src/js',
    base: '_src/js',
    dest: 'assets/',
    recursive: true,
    args: [ '-v' ],
    delete: true,
    compareMode: 'checksum',
    onStdout: function (data) {
      console.log(data.toString())
    }
  }, function () {
    console.log('End')
  })
})

gulp.task('third-js', function () {
  return gulp.src('_src/third/**/*.js')
    .pipe(concatJs('third.js'))
    .pipe(gulp.dest('assets/js'))
})
