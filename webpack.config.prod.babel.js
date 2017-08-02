import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import MappingPlugin from 'webpack-mapping-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.resolve(__dirname, 'public');

console.log("build production pkg...");

// multiple extract instances
const extractLess = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash].css',
  allChunks: true
});
const extractCSS = new ExtractTextPlugin({
  filename: 'css/[name].bootstrap.[chunkhash].css',
  allChunks: true
});

const webpackConfig = {
  devtool: 'hidden-source-map',

  entry: {
    panel: ['./client/pages/panel.js'],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: path.join(appPath, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader?pack=cleaner',
      // },
      // {
      //   test: /\.less/,
      //   loader: 'style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader?pack=cleaner!less-loader',
      // },
      
      /**
       * 因为AntdCSS 是非模块化，所以只有暂时取消
       */
      
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?pack=cleaner',
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader?pack=cleaner!less-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      'timer':"213"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
    }),
    extractLess,
    extractCSS,
    new MappingPlugin({
      basePath: '/',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({
              browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12',
                'Explorer >= 8', 'Android >= 4.3', 'iOS >=8', 'Safari >= 8']
            })]
          };
        },
      }
    })
  ],
};

//创建 HtmlWebpackPlugin 的实例
// https://www.npmjs.com/package/html-webpack-plugin
const entry = webpackConfig.entry;

// 为 HtmlwebpackPlugin 设置配置项，与 entry 键对应，根据需要设置其参数值
const htmlwebpackPluginConfig = {
  panel: {
    title: '金融门户CMS系统'
  }
};

for (const key in entry) {
  if (entry.hasOwnProperty(key) && key !== 'vendor') {
    webpackConfig.plugins.push(
      new HtmlwebpackPlugin({
        title: htmlwebpackPluginConfig[key].title,
        template: path.resolve(__dirname, 'server', 'templates', 'layout.html'),
        filename: path.resolve(__dirname, 'server', 'views', `${key}.hbs`),
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: [key, 'vendor'],
        //要把script插入到标签里
        inject: 'body'
      })
    );
  }
}

export default webpackConfig;