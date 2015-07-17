'use strict'

require('source-map-support').install()
const
	fs = require('fs'),
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	header = require('gulp-header'),
	mocha = require('gulp-mocha'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')

gulp.task('all', [ 'lint', 'compile', 'test', 'doc' ])

const
	src = 'src/**/*.js',
	testSrc = 'test/**/*.js'

function pipeBabel(stream) {
	return stream
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel({
		modules: 'amd',
		whitelist: [
			'es6.destructuring',
			'es6.modules',
			'strict'
		]
	}))
	.pipe(header(
		'if (typeof define !== \'function\') var define = require(\'amdefine\')(module);'))
	.pipe(sourcemaps.write({
		debug: true,
		sourceRoot: '/src'
	}))
	.pipe(gulp.dest('dist'))
}

gulp.task('doc', [ 'compile' ], function() {
	fs.writeFileSync('./doc.md', require('tupl/dist/doc')(require('./dist/ast')))
})

gulp.task('watch', function() {
	return pipeBabel(gulp.src(src).pipe(watch(src, { verbose: true })))
})

gulp.task('compile', function() { return pipeBabel(gulp.src(src)) })

gulp.task('lint', function() {
	return gulp.src([ src, testSrc, './*.js' ])
	.pipe(eslint())
	.pipe(eslint.format())
})

gulp.task('compile-test', function() {
	return gulp.src(testSrc)
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(sourcemaps.write({ debug: true, sourceRoot: '/test' }))
	.pipe(gulp.dest('./compiled-test'))
})
gulp.task('test', [ 'compile', 'compile-test' ], function() {
	return gulp.src('compiled-test/**/*.js', { read: false })
	.pipe(mocha({ bail: true }))
})

gulp.task('perf-test', [ 'compile', 'compile-test' ], function() {
	require('./compiled-test/perf-test')()
})
