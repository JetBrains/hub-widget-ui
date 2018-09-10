const path = require('path');

// const webpack = require('webpack');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  entry: {
    'empty-widget': path.join(__dirname, './src/empty-widget/empty-widget')
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
