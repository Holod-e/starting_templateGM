'use strict';

/*******************************************************************************\
		1.	DEPENDENCIES
\*******************************************************************************/

var gulp = require("gulp"),																// gulp core
		sass = require('gulp-sass'),													// sass compiler
		gulpif = require('gulp-if'),													// conditionally run a task
		csso = require('gulp-csso'),													// css optimization
		gutil = require('gulp-util'),													// utilete for uglify js
		uncss = require('gulp-uncss'),												// remove all unussed styles
		clean = require('gulp-clean'),												// removing files and folders
		rename = require("gulp-rename"),											// rename files
		notify = require("gulp-notify"),											// error reporternotify
		useref = require('gulp-useref'),											// parse build blocks in HTML files to replace references
		uglify = require('gulp-uglify'),											// uglifies the js
		bourbon = require('node-bourbon'),										// bourbon libruary
		plumber = require("gulp-plumber"),										// error reporter
		imagemin = require('gulp-imagemin'),									// img optimisation
		wiredep = require('wiredep').stream,									// bower dependencies to your source code
		spritesmith = require('gulp.spritesmith'),						// spretes generator
		autoprefixer = require('gulp-autoprefixer'),					// sets missing browserprefixes
		browserSync = require('browser-sync').create(),				// inject code to all devices
		imageminPngquant = require('imagemin-pngquant'),			// optimisation png images
		imageminJpegRecompress = require('imagemin-jpeg-recompress');// recompress jpg

/*******************************************************************************\
		2.	BROWSERSYNC (LOCAL SERVEVR)
\*******************************************************************************/

gulp.task('connect', ['watch'], function() {							// files to inject
	browserSync.init({
		server: {
			baseDir: "./app/"																		// base dir
		}
	});
});

/*******************************************************************************\
		3.	WATCHER (WATCHING FILE CHANGES)
\*******************************************************************************/

gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']),									// watching changes in HTML
	gulp.watch(['./app/sass/*.scss'], ['scss']),						// watching changes in SASS
	gulp.watch(['./app/js/*.js'], ['js']);									// watching changes in JS
});

/*******************************************************************************\
		4.	HTML TASKS
\*******************************************************************************/

gulp.task('html', function () {
	gulp.src('./app/index.html')														// get the files
		.pipe(gulp.dest('./app/'))														// where to put the file
		.pipe(browserSync.stream());													// browsersync stream
});

/*******************************************************************************\
		5.	SASS TASKS
\*******************************************************************************/

gulp.task('scss', function () {
	gulp.src('./app/sass/*.scss')														// get the files
		.pipe(plumber({errorHandler: notify.onError({
			 title:    'Ошибка :(',
			 message:  '<%= error.message %>'
			})}))
		.pipe(sass({includePaths: require('node-bourbon').includePaths}))
		.pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false}))
		.pipe(gulp.dest('app/css'))														// where to put the file
		.pipe(browserSync.stream());													// browsersync stream
});

/*******************************************************************************\
		6.	JS TASKS
\*******************************************************************************/

gulp.task('js', function() {
	return gulp.src('./app/js/common.js')										// get the files
		.pipe(browserSync.stream()); 													// browsersync stream
});

/*******************************************************************************\
		7.	IMAGES TASKS
\*******************************************************************************/

//sprite task 
gulp.task('sprite', function () {
  var spriteData = gulp.src('./app/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'top-down'
  }));
  return spriteData.pipe(gulp.dest('./app/img/'));
});

// Compress Task
gulp.task('compress', function() {
  return gulp.src('./app/img/**/*')
  .pipe(imagemin())
  .pipe(imageminJpegRecompress({loops: 3})())
  .pipe(gulp.dest('dist/img'))
});

// optimisation png images Task
gulp.task('pngquant', function() {
	return gulp.src('./app/img/**/*.png')
	.pipe(imageminPngquant({quality: '75-80', speed: 4})())
	.pipe(gulp.dest('./app/img'))													// where to put the file
	});

// all img task
gulp.task('images', function () {
	return gulp.src('./app/img/**/*')												// get the files
		.pipe(imagemin()) 																			// optimisation files
		.pipe(imageminPngquant({quality: '75-80', speed: 4})())
		.pipe(imageminJpegRecompress({loops: 3})())
		.pipe(gulp.dest('dist/img'))													// where to put the file
});

/*******************************************************************************\
		8.	FONTS TASKS
\*******************************************************************************/

gulp.task('fonts', function () {
	return gulp.src('./app/fonts/**/*')											// get the files
		.pipe(gulp.dest('dist/fonts'))												// where to put the file
});

/*******************************************************************************\
		9.	LIBS TASKS (PERSONAL DEVELOPER LIBS)
\*******************************************************************************/

gulp.task('libs', function () {
	return gulp.src('./app/libs/**/*')											// get the files
		.pipe(gulp.dest('dist/libs'))													// where to put the file
});

/*******************************************************************************\
		10.	EXTRASS TASKS (ROOT FILES, EXCEPT HTML-FILES)
\*******************************************************************************/

gulp.task('extrass', function () {
	return gulp.src([																				// get the files
		'app/*.*',
		'!app/*.html'																					// exept '.html'
	]).pipe(gulp.dest('dist'))															// where to put the file
});

/*******************************************************************************\
		11.	BUILD TASKS
\*******************************************************************************/
//nomincss
gulp.task('nomincss', function() {
	return gulp.src('./app/css/*.*')
		.pipe(gulp.dest('dist/nomin/css'))
	});
gulp.task('nominjs', function() {
	return gulp.src('./app/js/*.*')
		.pipe(gulp.dest('dist/nomin/js'))
	});


// Clean
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());																				// clean dir
});

// Build
gulp.task('build', ['clean'], function () {
	gulp.start('images');																		// images task
	gulp.start('fonts');																		// fonts task
	gulp.start('libs');																			// libs task
	gulp.start('nomincss');																	// copy nomin css task
	gulp.start('nominjs');																	// copy nomin js task
	gulp.start('extrass');
		return gulp.src('app/*.html')
			.pipe(useref())
			.pipe(gulpif('*.js', uglify().on('error', gutil.log)))
			.pipe(gulpif('main.css',uncss({
            html: ['./app/index.html']
        })))
			.pipe(gulpif('*.css', csso()))
			.pipe(gulp.dest('./dist'));

});

/*******************************************************************************\
		12.	DEFAULT TASKS
\*******************************************************************************/

gulp.task('default', ['connect', 'watch']);

/*******************************************************************************\
		13.	DEBUGING FUNCTION
\*******************************************************************************/
