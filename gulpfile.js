'use strict'

const
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	header = require('gulp-header'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('default', ['watch'])
gulp.task('all', ['compile', 'test'])

const
	src = 'src/**/*.js',
	testSrc = 'test/**/*.js'

gulp.task('watch', () =>
	pipeBabel(gulp.src(src).pipe(watch(src, {verbose: true}))))

gulp.task('compile', () => pipeBabel(gulp.src(src)))

gulp.task('compile-test', () =>
	gulp.src(testSrc)
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(sourcemaps.write({debug: true, sourceRoot: '/test'}))
	.pipe(gulp.dest('./compiled-test')))

gulp.task('perf-test', ['compile', 'compile-test'], () => {
	require('./compiled-test/perf-test')()
})

const pipeBabel = stream =>
	stream
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel({
		modules: 'amd',
		whitelist: ['es6.destructuring', 'es6.modules', 'es6.spread', 'strict']
	}))
	.pipe(header(
		'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
	.pipe(sourcemaps.write({
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest('dist'))
