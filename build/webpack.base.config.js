8064//webpack.base config
const webpack = require('webpack');
const path = require("path");
const fs = require("fs");
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vueLoaderConfig = require("./vue-loader.config");
const PROT = process.env.PROT || 8000

// 多线程
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

//提取公共文件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//项目名字
const projectName = "/";
var testEnv = "sit";

var distEnv = new webpack.DefinePlugin({
    'NODE_ENV': '"' + testEnv + '"',
    'ENV_HOST': '"https://hms-' + testEnv + '.test-cignacmb.com"',
});

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

//配置开始
module.exports = {
    context: path.resolve(__dirname, '../'),

    entry: {
        // app: './src/main.js',
        // trial: './src/view/trial/main.js',
        // detail: './src/view/detail/main.js',
        login: './src/view/login/main.js',
        // pension: './src/view/pension/main.js',
        // myOrder: './src/view/myOrder/index.js',
        // info: './src/view/info/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: ["html-loader"],
            },
            {
                test: /\.vue$/,
                exclude: "/node_modules/",
                loader: ['happypack/loader?id=vue']
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist/,
                loader: ['happypack/loader?id=js']
            },
            {
                test: /\.scss$/,
                loader: ['happypack/loader?id=sass']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: "css-loader"
                })
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(xlsx|xls)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=8192&name=files/[name].[ext]'
            },
        ]
    },
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            components: path.resolve(__dirname, '../src' + projectName + 'components'),
            commonvue: path.resolve(__dirname, '../src' + projectName + 'commonvue'),
            pages: path.resolve(__dirname, '../src' + projectName + 'pages'),
            common: path.resolve(__dirname, '../src' + projectName + 'assets/common'),
            assets: path.resolve(__dirname, '../src' + projectName + 'assets'),
            popup: path.resolve(__dirname, '../src' + projectName + 'assets/common/lib/popup/popup.js'),
            page: path.resolve(__dirname, '../src' + projectName + 'assets/common/lib/page/page.js'),
        },
    },

    // externals: {
    //     jquery: "jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    // },
    //插件
    plugins:
        [distEnv]
            .concat([
                //jquery jquery
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    'window.$': 'jquery',
                }),
                // new webpack.ProvidePlugin({
                //     avalon: 'avalon2',
                //     'window.avalon': 'avalon',
                // }),
                //js 编译多线程
                new HappyPack({
                    id: 'js',
                    threadPool: happyThreadPool,
                    loaders: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                        }
                    }],
                }),
                // sass 编译多线程
                new HappyPack({
                    id: 'sass',
                    threadPool: happyThreadPool,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                }),
                // vue 编译多线程
                new HappyPack({
                    id: 'vue',
                    threadPool: happyThreadPool,
                    loaders: [{
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                    }]
                }),
                //提取css
                new ExtractTextPlugin("styles.css"),
                new CommonsChunkPlugin({
                    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
                    chunks: ['main'],
                    minChunks: 1 // 提取所有entry共同依赖的模块
                }),
                //自动生成html文件
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: 'index.html',
                    inject: true
                }),
                new HtmlWebpackPlugin({
                    filename: 'login.html',	//生成的html存放路径，相对于 path
                    chunks: ['login'],
                    template: 'index.html',	//html模板路径
                    inject: true,	//允许插件修改哪些内容，包括head与body
                    hash: true	//为静态资源生成hash值
                }),
                // new HtmlWebpackPlugin({
                //     filename: 'trial.html',	//生成的html存放路径，相对于 path
                //     chunks: ['trial'],
                //     template: 'index.html',	//html模板路径
                //     inject: true,	//允许插件修改哪些内容，包括head与body
                //     hash: true	//为静态资源生成hash值
                // }),
            ])
    ,
    devServer: {
        disableHostCheck: true,
        hot: false,
        inline: false,
        proxy: {
            '/gis_server/*': {
                target: 'http://hms-' + testEnv + '.test-cignacmb.com',
                host: 'hms-uat.test-cignacmb.com',
                secure: false,
                onProxyRes: function onProxyRes(proxyRes, req, res) {
                    if (proxyRes.headers.location) {
                        var address = getIpAddress()
                        proxyRes.headers.location = 'http://' + address + ':8050'; //重写重定向路径
                    }
                }
            }
        }
    }
}

function getIpAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};

