const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const jade = require("gulp-jade");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("connect", () => {
  connect.server({
    root: __dirname,
    port: 8000,
    livereload: true
  });
});

gulp.task("jade", () => {
  gulp
    .src("./assets/partials/index.jade")
    .pipe(plumber())
    .pipe(
      jade({
        locals: "./"
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

gulp.task("js", () => {
	gulp
	.src("./assets/js/functions.js")
	.pipe(plumber())
	.pipe(connect.reload())
});

gulp.task("sass", () => {
  gulp
    .src("./assets/css/main.sass")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(gulp.dest("./assets/css/"))
    .pipe(connect.reload());
});

gulp.task("watch", () => {
  gulp.watch("./assets/partials/**/*.jade", ["jade"]);
  gulp.watch("./assets/css/**/*.sass", ["sass"]);
  gulp.watch("./assets/js/**/*.js", ["js"]);
});

gulp.task("default", ["jade", "sass", "js", "watch", "connect"]);
