const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {

    mode: 'development',    // 开发模式（不压缩代码）
    devtool: false,         // 去掉 eval，不让代码变复杂
    optimization: {
        minimize: false     // 绝对不压缩
    },

    // 入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname,'dist'),
        // 打包后文件的文件名
        filename: "bundle.js",
        environment: {
            arrowFunction: false
        }
    },

    // 配置模块解析，让webpack能识别ts、js后缀文件
    resolve: {
        extensions: ['.ts', '.js', '.less']
    },

    // 指定webpack打包时候使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env",
                            {
                                targets: {
                                    "chrome": "58",
                                    "ie":"11"
                                },
                                "corejs":3,
                                "useBuiltIns": "usage"
                            }]
                        ]
                    }
                },'ts-loader'],
                // 指定要排除的文件
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置Webpack插件
    plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
        template: "./src/index.html"  // 👈 就加这一行！
    }),
],
}