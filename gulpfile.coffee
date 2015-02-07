gulp = require 'gulp'
gutil = require 'gulp-util'
karma = require 'gulp-karma'

glob = require 'glob'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

browserifyFiles = []

gulp.task 'browserify', ['browserify-glob'], ->
  browserify
      entries: browserifyFiles
      debug: true
    .bundle()
    .on 'error', (err) ->
      gutil.log 'Browserify', err.message
      @emit('end')
    .pipe source('bundle.js')
    .pipe buffer()
    .pipe gulp.dest('./test/browser')

gulp.task 'browserify-glob', (done) ->
  glob './test/browser/*test*', (err, files) ->
    browserifyFiles = files
    done(err)

gulp.task 'karma', ['browserify'], ->
  gulp.src './test/browser/bundle.js'
    .pipe karma
      configFile: 'karma.conf.js'
      action: 'run'

gulp.task 'watch', ['default'], ->
  gulp.watch [
    'lib/**/*.js'
    'test/browser/*.js'
    'test/files/**/*'
    '!test/browser/bundle.js'
  ], ['browserify']

gulp.task 'test', ['karma']
gulp.task 'default', ['browserify']
