var gulp = require('gulp')
var rsync = require('rsyncwrapper')
var imagemin = require('gulp-imagemin')
var spritesmith = require('gulp.spritesmith')
var del = require('del')

// FAVICON

gulp.task('sync-favicon', function () {
  rsync({
    src: '_src/favicon',
    base: '_src/favicon',
    dest: 'assets',
    recursive: true,
    args: ['-v'],
    delete: true,
    compareMode: 'checksum',
    onStdout: function (data) {
      console.log(data.toString())
    }
  }, function () {
    console.log('End')
  })
})

// IMG

gulp.task('sync-img', function () {
  rsync({
    src: '_src/img',
    base: '_src/img',
    dest: 'assets/',
    recursive: true,
    args: ['-v'],
    delete: true,
    compareMode: 'checksum',
    onStdout: function (data) {
      console.log(data.toString())
    }
  }, function () {
    console.log('End')
  })
})

// MIN

gulp.task('min-img', function () {
  return gulp.src('_src/img/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 })
  ]))
  .pipe(gulp.dest('_src/img/'))
})

// SPRITE

gulp.task('del-sprite', function () {
  del('_src/third/sprite/*')
})

gulp.task('sprite', ['del-sprite'], function () {
  var spriteData = gulp.src('_src/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../../img/sprite/sprite.png',
    cssName: 'sprite.css',
    padding: 5
  }))
  return spriteData.pipe(gulp.dest('_src/third/sprite/'))
})

gulp.task('sync-sprite', ['sprite'], function () {
  rsync({
    src: '_src/third/**/*.png',
    dest: 'assets/img/sprite/',
    recursive: true,
    args: ['-v'],
    delete: true,
    compareMode: 'checksum',
    onStdout: function (data) {
      console.log(data.toString())
    }
  }, function () {
    console.log('End')
  })
})
