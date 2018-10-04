const browserSync = require("browser-sync");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const mustache = require("gulp-mustache");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const prettyHtml = require('gulp-pretty-html');
const jsonConcat = require('gulp-json-concat');
const plugins = require('gulp-load-plugins')({
  pattern: '*'
});
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

// copy libs
gulp.task('lib', function() {
    return gulp.src('src/lib/**/*.*')
  	.pipe(gulp.dest('dist/lib/'));
});
// copy img
gulp.task('image-copy', function() {
    return gulp.src('src/img/**/*.*')
  	.pipe(gulp.dest('dist/img/'));
});
// sass
gulp.task('sass', function() {
    return gulp.src(['src/scss/style.scss'])
    .pipe(sass())
    .pipe(autoprefixer(['last 2 versions'], {
      cascade: true,
      grid: true
    }))
    // .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({ stream: true }))
});
// scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(browserify({
        insertGlobals : true,
        debug: true
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js/'))
      .pipe(browserSync.reload({ stream: true }))
});
// data
gulp.task('db-json', function() {
    return gulp.src(["src/data/parts/**/*.json"])
    .pipe(jsonConcat('data.json',function(data){
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest("src/data"));
});
// browserSync
gulp.task('browserSync', function() {
      browserSync.init({
        server: {
          baseDir: "./dist"
        },
        notify: true
      });

});
// mustache
gulp.task('mustache',['db-json'], function() {
    return gulp.src('src/templates/*.mustache')
    .pipe(mustache('src/data/data.json', {extension: '.html'},{}))
    .pipe(prettyHtml({
          indent_size: 2,
          indent_char: ' ',
          unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
      }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
});
// watch
gulp.task('watch', ['lib','image-copy','sass', 'scripts', 'mustache', 'browserSync'], function() {
	gulp.watch('src/img/**/*.*', ['image-copy']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch(['src/data/parts/**/*.json'], ['mustache']);
  gulp.watch('src/templates/**/*.mustache', ['mustache']);
});
gulp.task('default', ['watch']);
