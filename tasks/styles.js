var browserSync = require('browser-sync').get('dpn_server')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus')
var rupture = require('rupture')
var postcss = require('gulp-postcss')
var lost = require('lost')
var autoprefixer = require('autoprefixer')
var concatCss = require('gulp-concat-css')
var del = require('del')

gulp.task('global-styl', () => {
  return gulp.src('_src/styl/global.styl')
    .pipe(plumber({ errorHandler: notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'Erro na tarefa Stylus'
    }) }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [rupture()]
    }))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_site/assets/css/"))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('assets/css/'))
})

gulp.task('pages-styl', () => {
  return gulp.src('_src/styl/pages/*.styl')
    .pipe(plumber({ errorHandler: notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'Erro na tarefa Stylus'
    }) }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [rupture()]
    }))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_site/assets/css/"))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('assets/css/'))
})

gulp.task('includes-styl', () => {
  return gulp.src('_src/styl/includes/*.styl')
    .pipe(plumber({ errorHandler: notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'Erro na tarefa Stylus'
    }) }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [rupture()]
    }))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("_site/assets/css/"))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('assets/css/'))
})

gulp.task('third-css', () => {
  return gulp.src(['_src/third/**/*.css'])
    .pipe(concatCss('third.css'))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('del-css', function () {
  del(['assets/css/*.css'])
})
