const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true, // This will make the server understand '/some-link' routs instead of '/#/some-link'
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    port: 3000,
  },
  entry: {
    bundle: './src--redux/',
    editor: './src--redux/editor.js',
  },
  output: {
    path: path.join(__dirname, 'wp-content/themes/wp-react-theme/build'),
    filename: '[name].js',
    publicPath: '/wp-content/themes/wp-react-theme/build/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'react-hot-loader',
      },
      {
        test: /\.jsx?$/,
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Hot reloading
    new webpack.NoEmitOnErrorsPlugin(), // Webpack will let you know if there are any errors
    new ExtractTextPlugin('[name].css'),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
    }),
    // TODO Uncomment and adjust to your needs
    // new WebpackPwaManifest({
    //   fingerprints: false,
    //   name: 'name',
    //   short_name: 'short_name',
    //   description: 'description',
    //   background_color: '#f9f6f6',
    //   theme_color: '#5a3a3b',
    //   icons: [
    //     {
    //       src: path.resolve('src/icon.png'),
    //       sizes: [16, 48, 72, 96, 144, 168, 192, 512],
    //     },
    //   ],
    // }),
    // TODO Uncomment and adjust to your needs
    // new OfflinePlugin({
    //   externals: [
    //     '/',
    //     'https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js',
    //   ],
    //   ServiceWorker: {
    //     entry: './sw-handler.js',
    //     publicPath: '/sw.js',
    //     output: '../../../../sw.js',
    //   },
    //   AppCache: {
    //     publicPath: '/appcache/',
    //     directory: '../../../../appcache/',
    //     // TODO adjust to your needs
    //     FALLBACK: {
    //       '/sample-page': '/',
    //       '/contact': '/',
    //     },
    //   },
    //   autoUpdate: true,
    //   // TODO adjust to your needs
    //   cacheMaps: [
    //     {
    //       match: /(\/sample-page|\/contact)\/?$/,
    //       to: '/',
    //       requestTypes: ['navigate'],
    //     },
    //   ],
    // }),
    // new WriteFilePlugin({
    //   // write only Service Worker and App Cache files
    //   test: /(sw\.js|manifest\.appcache|manifest\.html)$/,
    //   useHashIndex: false
    // }),
  ],
};
