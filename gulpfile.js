'use strict'

require('source-map-support').install()
require('es6-shim')
const
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	header = require('gulp-header'),
	mocha = require('gulp-mocha'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('all', [ 'lint', 'lib', 'babel', 'test' ])

const
	lib = 'src/private/render/source-map/**/*.js',
	src = [ 'src/**/*.js', '!' + lib ],
	testSrc = 'test/**/*'

gulp.task('a-test', function() {
	require('./dist/test')
})


function pipeBabel(stream) {
	return stream
	.pipe(plumber())
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
	.pipe(gulp.dest('dist'))
}

gulp.task('watch', function() {
	return pipeBabel(gulp.src(src).pipe(watch(src, { verbose: true })))
})

gulp.task('babel', function() { return pipeBabel(gulp.src(src)) })

gulp.task('lib', function() {
	return gulp.src(lib).pipe(gulp.dest('dist/private/render/source-map'))
})

gulp.task('lint', function() {
	return gulp.src([ './gulpfile.js', testSrc ].concat(src))
	.pipe(eslint())
	.pipe(eslint.format())
})

gulp.task('compile-test', function() {
	return gulp.src(testSrc)
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(sourcemaps.write('.', { debug: true, sourceRoot: '/test' }))
	.pipe(gulp.dest('./compiled-test'))
})
gulp.task('test', [ 'compile-test' ], function() {
	return gulp.src('compiled-test/**/*.js', { read: false })
	.pipe(mocha({ bail: true }))
})
