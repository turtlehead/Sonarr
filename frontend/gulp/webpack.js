var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var livereload = require('gulp-livereload');
var path = require('path');
var webpack = require('webpack');
var errorHandler = require('./helpers/errorHandler');

const uiFolder = 'UI.Phantom';
const htmlAnnotate = path.join(__dirname, 'helpers', 'html-annotate-loader');
const root = path.join(__dirname, '..', 'src');

console.log('ROOT:', root);

const config = {
  devtool: '#source-map',
  watchOptions: {
    poll: true
  },
  entry: {
    vendor: 'vendor.js',
    main: 'main.js'
  },
  resolve: {
    root: [
      root,
      path.join(root, 'Shims'),
      path.join(root, 'JsLibraries')
    ],
    alias: {
      'backbone-pageable': 'JsLibraries/backbone.pageable',
      'backbone.deepmodel': 'Shims/backbone.deep.model',
      'backbone.sorted.collection': 'JsLibraries/backbone-sorted-collection',
      'radio': 'JsLibraries/backbone.radio',
      'backgrid.selectall': 'Shims/backbone.backgrid.selectall',
      'marionette': 'Shims/backbone.marionette',
      'momentRange': 'JsLibraries/moment-range',
      'signalR': 'Shims/jquery.signalR'
    }
  },
  output: {
    filename: path.join('_output', uiFolder, '[name].js'),
    sourceMapFilename: path.join('_output', uiFolder, '[name].map')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  resolveLoader: {
    modulesDirectories: [
      'node_modules',
      'gulp/webpack/'
    ]
  },
  eslint: {
    formatter: function(results) {
      return JSON.stringify(results);
    }
  },
  module: {
    preLoaders: [{
      test: /\.hbs$/,
      loader: htmlAnnotate
    }],
    loaders: [
      { test: /\.js?$/, exclude: /(node_modules|JsLibraries)/, loader: 'babel', query: { presets: ['es2015'] } },
      // This is disabled until we drop the number of errors
      // { test: /\.js?$/, exclude: /(node_modules|JsLibraries)/, loader: 'eslint-loader' },
      {
        test: /\.hbs?$/,
        loader: 'handlebars-loader',
        query: {
          runtime: 'handlebars',
          helperDirs: [
            root + '/Handlebars/Helpers/Episode',
            root + '/Handlebars/Helpers/Series',
            root + '/Handlebars/Helpers/Rating',
            root + '/Handlebars/Helpers/DateTime',
            root + '/Handlebars/Helpers/Object',
            root + '/Handlebars/Helpers/Number',
            root + '/Handlebars/Helpers/String'
          ],
          knownHelpers: ['if_eq', 'unless_eq', 'if_gt']
        }
      }]
  }
};

gulp.task('webpack', () => {
  return gulp.src('main.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest(''));
});

gulp.task('webpackWatch', () => {
  config.watch = true;
  return gulp.src('')
    .pipe(webpackStream(config))
    .on('error', errorHandler)
    .pipe(gulp.dest(''))
    .pipe(livereload());
});
