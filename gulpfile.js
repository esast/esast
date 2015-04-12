'use strict'

require('es6-shim')
const
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	header = require('gulp-header'),
	mocha = require('gulp-mocha'),
	// plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps')
	// watch = require('gulp-watch')

gulp.task('all', [ 'lint', 'lib', 'babel', 'test' ])

const
	lib = './src/private/render/source-map/**/*.js',
	src = [ './src/**/*.js', '!' + lib ]

gulp.task('babel', function() {
	return gulp.src(src)
	// .pipe(watch(src, { verbose: true }))
	.pipe(sourcemaps.init())
	.pipe(babel({
		modules: 'amd'
	}))
	.pipe(header(
		'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
	.pipe(sourcemaps.write('.', {
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest('./dist'))
})

gulp.task('lib', function() {
	return gulp.src(lib).pipe(gulp.dest('dist/private/render/source-map'))
})

gulp.task('lint', function() {
	return gulp.src([ './gulpfile.js' ].concat(src))
	.pipe(eslint())
	.pipe(eslint.format())
})

gulp.task('compile-test', function() {
	return gulp.src('test/**/*')
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(sourcemaps.write('.', { debug: true, sourceRoot: '/test' }))
	.pipe(gulp.dest('./compiled-test'))
})
gulp.task('test', [ 'compile-test' ], function() {
	return gulp.src('compiled-test/**/*.js', { read: false })
	.pipe(mocha())
})
