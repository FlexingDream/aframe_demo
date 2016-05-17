var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');


var IS_PRODUCTION = process.env.NODE_ENV === 'development';

/*var ENTRY_POINTS = [
  './src/js/app',
  './src/js/scenes/scene_1.js'
];*/

var JS_LOADERS = [
  'babel?cacheDirectory&presets[]=react,presets[]=es2015,presets[]=stage-0'
];

var PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"development"'
  }})
];
if (IS_PRODUCTION) {
  // Uglify in production.
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      },
      sourcemap: false
    })
  );
}

module.exports = {
  entry: {
    testing: './src/js/scenes/testing',
    scene_4: './src/js/scenes/scene_4',
    scene_3: './src/js/scenes/scene_3',
    scene_2: './src/js/scenes/scene_2',
    scene_1: './src/js/scenes/scene_1'
  },
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: '[name].bundle.js',
    // Bundle will be built at ./src/media/js.
    path: './build',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        loaders: JS_LOADERS,
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins: PLUGINS,
  resolve: {
    extensions: ['', '.js', '.json'],
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: [
      'src/js',
      'node_modules',
    ]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  }
};
