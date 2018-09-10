const path = require('path');

// const webpack = require('webpack');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  entry: {
    'configurable-widget': path.join(__dirname, './src/configurable-widget/configurable-widget'),
    'configuration-form': path.join(__dirname, './src/configuration-form/configuration-form'),
    'configuration-mode': path.join(__dirname, './src/configuration-mode/configuration-mode'),
    'empty-widget': path.join(__dirname, './src/empty-widget/empty-widget'),
    'refresh-period': path.join(__dirname, './src/refresh-period/refresh-period'),
    'service-select': path.join(__dirname, './src/service-select/service-select'),
    'super-digits': path.join(__dirname, './src/super-digits/super-digits'),
    timer: path.join(__dirname, './src/timer/timer'),
    'widget-loader': path.join(__dirname, './src/widget-loader/widget-loader'),
    'widget-title': path.join(__dirname, './src/widget-title/widget-title')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.*css$/,
        exclude: [ringUiWebpackConfig.componentsPath],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:7]'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              ctx: {variables: require('@jetbrains/ring-ui/extract-css-vars')}
            },
            plugins: () => [
              require('postcss-import')({}),
              require('postcss-modules-values-replace')({}),
              require('postcss-cssnext')({
                features: {
                  calc: {
                    mediaQueries: true
                  },
                  customProperties: {
                    preserve: true,
                    variables: require('@jetbrains/ring-ui/extract-css-vars')
                  }
                }
              })
            ]
          }
        }]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }]
  },
  resolve: {
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react'
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    '@jetbrains/ring-ui': {
      commonjs: '@jetbrains/ring-ui',
      commonjs2: '@jetbrains/ring-ui'
    }
  }
};
