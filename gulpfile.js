var cp = require("child_process");
var browserSync = require("browser-sync").create("dpn_server");
var gulp = require("gulp");
var requireDir = require("require-dir");
var runSequence = require("run-sequence");

//--------------------------------------------------------------

requireDir("./tasks");

//--------------------------------------------------------------

gulp.task("jekyll-build", function(done) {
    browserSync.notify("Building Jekyll");
    return cp.spawn("jekyll", ["build"], {stdio: "inherit"})
        .on("close", done);
});

gulp.task("jekyll-rebuild", ["jekyll-build"], function() {
    browserSync.reload();
});

//--------------------------------------------------------------

gulp.task("browser-sync", ["jekyll-build"], function () {
    browserSync.init({
        server: {
            baseDir: "_site"
        },
        open: false,
        notify: false
    });
});

gulp.task("browserSync-reload", function () {
    browserSync.reload();
});

//--------------------------------------------------------------

gulp.task("watch", function () {
    gulp.watch(["*.html", "_includes/**/*.html", "_layouts/*.html", "_config.yml", "_data/*.yml", "_posts/**/*"], ["jekyll-rebuild"]);
    gulp.watch(["_src/styl/global/*.styl"], ["global-styl"]);
    gulp.watch(["_src/styl/pages/*.styl"], ["pages-styl"]);
    gulp.watch(["_src/styl/includes/*.styl"], ["includes-styl"]);
    gulp.watch(["_src/js/*.js"], ["global-js", "jekyll-rebuild"]);
    gulp.watch(["_src/img/**/*"], ["sync-img", "jekyll-rebuild"]);
});

// --------------------------------------------------------------

gulp.task("build", function(callback) {
    runSequence(
        "del-css",
        "sync-favicon",
        "sync-img",
        "sync-sprite",
        "global-styl",
        "pages-styl",
        "includes-styl",
        "third-css",
        "global-js",
        "third-js",
        "jekyll-rebuild",
        callback
    );
});

gulp.task("server", function (callback) {
    runSequence(
        "browser-sync",
        "watch",
        callback
    );
});
