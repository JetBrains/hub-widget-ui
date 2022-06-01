const {join, resolve, basename} = require('path');

const webpack = require('webpack');
const ringUiWebpackConfig = require('@jetbrains/ring-ui/webpack.config');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
  mode: 'development',
  entry: getComponentsEntryPoints(),
  output: {
    path: join(__dirname, './dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'commonjs',
    publicPath: '/dist/'
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      ...ringUiWebpackConfig.config.module.rules,
      {
        test: /\.css$/,
        include: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules/cheerio')
        ],
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1
          }
        }]
      },
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@jetbrains/jetbrains', {
                useBuiltIns: 'usage'
              }]
            ]
          }
        }
      }]
  },
  plugins: [
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
    const name = basename(folder);
    entryConfig[name] = resolve(folder, `${name}.js`);
    return entryConfig;
  }, {});
}
