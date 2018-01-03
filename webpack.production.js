const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/app.jsx',
    editor: './src/editor.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    // TODO adjust to your needs, use CDN like so: 'https://xxx.cloudfront.net/wp-content/themes/wp-react-theme/build/'
    publicPath: '/wp-content/themes/wp-react-theme/build/'
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
    new webpack.NoEmitOnErrorsPlugin(), // Webpack will let you know if there are any errors
    new ExtractTextPlugin('[name].[hash].css'),
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
    //   start_url: '/home',
    //   background_color: '#f9f6f6',
    //   theme_color: '#5a3a3b',
    //   icons: [
    //     {
    //       src: path.resolve('src/icon.png'),
    //       sizes: [16, 48, 72, 96, 144, 168, 192, 512],
    //     },
    //   ],
    // }),
    new OfflinePlugin({
      externals: [
        '/',
        'https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js',
      ],
      ServiceWorker: {
        entry: './sw-handler.js',
        publicPath: '/sw.js',
        output: '../../../../sw.js',
      },
      AppCache: {
        publicPath: '/appcache/',
        directory: '../../../../appcache/',
        // TODO adjust to your needs
        FALLBACK: {
          '/home': '/',
          '/contact': '/',
        },
      },
      autoUpdate: true,
      // TODO adjust to your needs
      cacheMaps: [
        {
          match: /(\/home|\/contact)\/?$/,
          to: '/',
          requestTypes: ['navigate'],
        },
      ],
    }),
  ],
};
