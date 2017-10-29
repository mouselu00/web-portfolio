const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const jade = require("gulp-jade");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const deploy = require("gulp-gh-pages");

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

gulp.task("build" , () => {
  gulp.src("./assets/img/**/*").pipe(gulp.dest("./dist/assets/img/"));
  gulp.src("./assets/css/main.css").pipe(gulp.dest("./dist/assets/css/"));
  gulp.src("./assets/js/functions.js").pipe(gulp.dest("./dist/assets/js/"));
  gulp.src("./index.html").pipe(gulp.dest("./dist/"));
})

gulp.task("deploy", () => {
  gulp.src("./dist/**/*").pipe(deploy({remoteUrl: "https://github.com/mouselu00/web-portfolio.git",
    branch: "gh-pages"}));
});

gulp.task("default", ["jade", "sass", "js", "watch", "connect"]);
