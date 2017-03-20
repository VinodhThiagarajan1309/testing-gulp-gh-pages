// gulp
var gulp = require('gulp');

var deploy      = require('gulp-gh-pages');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


// tasks
gulp.task('lint', function() {
  gulp.src(['./views/**/*.js', '!./node_modules/**'])
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    return del.sync('./dist');
});

var concat = require('gulp-concat');
        var uglify = require('gulp-uglify');
        var minifyJS = require('gulp-minify');
        gulp.task('concat', function() {
          return gulp.src('views/js/*.js')
            .pipe(minifyJS())
            .pipe(concat('bundle.min.js'))
            .pipe(uglify({ mangle: false }))
            .pipe(gulp.dest('./dist/'));
        });

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./views/css/*.css', '!./node_modules/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/css/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./views/**/*.js', '!./node_modules/**','!./font-awesome/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js-app', function() {
  gulp.src('./views/app.js')
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});


gulp.task('copy-images', function() {
  return gulp.src('views/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-node-modules', function () {
  gulp.src('!./node_modules/**')
    .pipe(gulp.dest('dist/node_modules'));
});

gulp.task('copy-font-awesome', function () {
  gulp.src('!./font-awesome/**')
    .pipe(gulp.dest('dist/font-awesome'));
});

gulp.task('copy-html-files', function () {
  gulp.src('./views/view/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/view/'));
});

gulp.task('copy-html-index', function () {
  gulp.src('./views/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('/views' + 'js/*.js', ['minify-js']);
   // Watch .html files
  gulp.watch('/views' + 'view/*.html', ['copy-html-files']);
   // Watch image files
  gulp.watch('/views' + 'images/**/*', ['copy-images']);
 });
gulp.task('connect', function () {
  connect.server({
    root: '/',
    port: 8000
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: '/',
    port: 8080
  });
});


// default task
gulp.task('default',
  ['lint', 'connect']
);
gulp.task('build', ['clean'],function() {
  runSequence(
    ['lint', 'minify-css','minify-js-app', 'minify-js', 'concat','copy-html-files',
    'copy-html-index', 'copy-node-modules', 'copy-font-awesome','copy-images','watch','connectDist','createFile']
  );
});

gulp.task('createFile', function() {
    var filename = '.dingo';
    var string = "";

     gulp.src('.nojekyll')
    .pipe(gulp.dest('dist/'));
});


/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
