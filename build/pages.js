global.window = {location: {href: ''}}
global.window.navigator = {
    userAgent: 'node',
  };
global.NODE_ENV = '';
global.ENV_HOST = '';
const HtmlWebpackPlugin = require('html-webpack-plugin');

var projectName = require('../src/config/config').project;

var pagesConfig = {
    pages: {},
    getConfig: function () {
        var that = this;
        var entry = {}
        var plugins = []
        var pages = that.pages;

        console.log("that.pages",that.pages)

        for (x in pages) {
            var module = pages[x];
            for (y in module) {
                var pathBase = './src/view/';
                var entryPath = pathBase + x + '/' + module[y] + '/' + 'index.js';
                var entryName = x + '-' + module[y]
                entry[entryName] = entryPath;

                var pluginPath = pathBase + x + '/' + module[y] + '/' + 'index.html';

                var plugInConfigObject = {
                    filename: (x === 'common') ? module[y] + '.html' : entryName + '.html',
                    chunks: ['common', entryName],
                    template: pluginPath,	//html模板路径
                    inject: true,	//允许插件修改哪些内容，包括head与body
                    hash: true	//为静态资源生成hash值
                }
                var plugin = new HtmlWebpackPlugin(plugInConfigObject)
                plugins.push(plugin)
            }
        }
        var result = {
            entry: entry,
            plugins: plugins
        }
        return result;
    }
};

//配置公共页
pagesConfig.pages['common'] = [

    'index',
    'login',
    // 'myOrder',
    // 'item',
    // 'mytest',
];
//配置项目页（项目名引用 config.js 里的project属性）
pagesConfig.pages[projectName] = [
    // 'detail',
    // 'preview',
    // '2',
    // '3',
    // // '4',
    // '8',
    // '10',
    // 'crs',
    // 'crs_userinfo',
    // 'pay-success',
    // 'faceMatching',
    // 'previewAndConfirmOrder',
    // 'cashValue',
];
//生成配置


console.log(pagesConfig.getConfig());

module.exports = pagesConfig;
