'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

var bc = './bower_components/';
var nm = './node_modules/';

gulp.task('js', function() {

  gulp.src('builds/development/routes/**/*.js')
    .pipe(gulp.dest('builds/dist/routes/'));

  gulp.src('builds/development/public/js/*.js')
    //.pipe(concat('ngTest.js'))
    .pipe(gulp.dest('builds/dist/public/js/'));

  gulp.src('builds/development/*.js')
    //.pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dist/'));

  gulp.src('builds/development/public/js/controllers/*.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('builds/dist/public/js/'));

  gulp.src('builds/development/public/js/services/*.js')
    .pipe(concat('services.js'))
    .pipe(gulp.dest('builds/dist/public/js/'));

});

gulp.task('www', function() {
    gulp.src('builds/development/bin/www')
      .pipe(gulp.dest('builds/dist/bin/'));
});

gulp.task('jade', function() {
  gulp.src('builds/development/**/*.jade')
    .pipe(gulp.dest('builds/dist/'))
});

gulp.task('html', function() {
  gulp.src('builds/development/**/*.html')
    .pipe(gulp.dest('builds/dist/'))
});

gulp.task('sass', function () {
  gulp.src('builds/development/public/sass/**/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(csso())
      .pipe(gulp.dest('builds/dist/public/css'));

  gulp.src('builds/development/public/sass/bootstrap-table.css')
    .pipe(gulp.dest('builds/dist/public/css'));
});

gulp.task('img', function() {
  gulp.src('builds/development/public/img/**/*')
    .pipe(gulp.dest('builds/dist/public/img/'));
});

gulp.task('json', function() {
  gulp.src('builds/development/data/*.json')
    .pipe(gulp.dest('builds/dist/data/'));
  gulp.src('builds/development/public/data/*.json')
    .pipe(gulp.dest('builds/dist/public/data/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/**/*.js', ['js']);
  gulp.watch('builds/development/public/sass/**/*.scss', ['sass']);
  gulp.watch('builds/development/**/*.jade', ['jade']);
  gulp.watch('builds/development/**/*.html', ['html']);
  gulp.watch('builds/development/public/img/**/*', ['img']);
});

gulp.task('libs', function() {
  gulp.src(bc+'jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/dist/public/libs/jquery/'));

  gulp.src(bc+'bootstrap/dist/**/*.*')
      .pipe(gulp.dest('./builds/dist/public/libs/bootstrap/'));

  gulp.src(bc+'font-awesome/**/*.*')
      .pipe(gulp.dest('./builds/dist/public/libs/font-awesome/'));

  gulp.src(bc+'bootstrap-material-design/dist/**/*.*')
      .pipe(gulp.dest('./builds/dist/public/libs/bootstrap-material-design/'));

  gulp.src([bc+'angular/angular.js',
            bc+'angular-animate/angular-animate.js',
            bc+'angular-cookies/angular-cookies.js',
            bc+'angular-i18n/angular-locale_ru-ru.js',
            bc+'angular-loader/angular-loader.js',
            bc+'angular-resource/angular-resource.js',
            bc+'angular-route/angular-route.js',
            bc+'angular-sanitize/angular-sanitize.js',
            bc+'angular-touch/angular-touch.js',
            bc+'firebase/firebase.js',
            bc+'angularfire/dist/angularfire.js',
          ])
      .pipe(concat('angular.concat.js'))
      .pipe(gulp.dest('./builds/dist/public/libs/angular/'));

});


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: "builds/dist/**/*.*",
        browser: "google chrome",
        port: 3000,
	});
});



gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'builds/dist/bin/www'
	}).on('start', function () {

		if (!started) {
			cb();
			started = true;
		}
	});
});



gulp.task('default', [
  'libs',
  'jade',
  'html',
  'img',
  'js',
  'json',
  'www',
  'sass',
  'browser-sync',
  'watch'
]);
