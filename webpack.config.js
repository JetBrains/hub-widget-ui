const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  mode: 'development',
  entry: getComponentsEntryPoints(),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'commonjs2',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.*css$/,
        exclude: [ringUiWebpackConfig.componentsPath],
        use: [{
          loader: MiniCssExtractPlugin.loader
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
              require('postcss-import')({
                load: () => '/* import pruned */'
              }),
              require('postcss-modules-values-replace')({}),
              require('postcss-preset-env')({
                features: {
                  'custom-properties': {
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
              ['@jetbrains/jetbrains', {
                useBuiltIns: 'usage'
              }]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.BannerPlugin({
      raw: true,
      test: /\.js$/,
      banner: data => {
        const chunk = data.chunk;
        if (chunk.files.find(filename => /\.*css$/.test(filename))) {
          return 'require("./[name].css")';
        }
        return '/* No CSS companion file found */';
      }
    })
  ],
  externals: [
    'react',
    'react-dom',
    'prop-types',
    /@jetbrains\/ring-ui/,
    /hub-dashboard-addons/,
    /core-js/
  ]
};

function getComponentsEntryPoints() {
  const allComponentsFolders = require('glob').sync('src/*');

  return allComponentsFolders.reduce((entryConfig, folder) => {
    const name = path.basename(folder);
    entryConfig[name] = path.resolve(folder, `${name}.js`);
    return entryConfig;
  }, {});
}
