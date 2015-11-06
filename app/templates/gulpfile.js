'use strict';

var browserify = require('browserify'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    lint = require('gulp-eslint'),
    reactify = require('reactify'), // TODO: Make this conditional
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream');

    <%
    var css_srcs = [];

    if(scaffold.indexOf('Bootstrap') > -1) {
      css_srcs.push('\'node_modules/bootstrap/dist/css/bootstrap.min.css\'');
      css_srcs.push('\'node_modules/bootstrap/dist/css/bootstrap-theme.min.css\'');
    }

    css_srcs.push('\'./src/css/style.scss\'');
    -%>

var config = {
  paths: {
    css: [<%- css_srcs.join(", ") %>],

    dist: './dist',

    html: './src/*.html',

    images: './src/images/*',

    js: './src/**/*.js',

    mainJs: './src/js/main.react.js',

    manifest: './src/manifest.json'
  }
};

gulp.task('lint', function() {
  return gulp.src(config.paths.js).
           pipe(lint({ config: "eslint.config.json" })).
           pipe(lint.format());
});

gulp.task('html', function() {
  gulp.src(config.paths.html).
    pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify) // TODO: Make this conditional
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/js'));
});

gulp.task('css', function() {
  gulp.src(config.paths.css).
    pipe(sass.sync().on('error', sass.logError)).
    pipe(concat('bundle.css')).
    pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
  gulp.src(config.paths.images).
    pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('manifest', function() {
  gulp.src(config.paths.manifest).
    pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', [
  'lint',
  'html',
  'js',
  'css',
  'images',
  'manifest'
]);
