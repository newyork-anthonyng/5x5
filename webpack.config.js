const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ],
                        plugins: [
                            "@babel/plugin-transform-react-jsx"
                        ]
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, "src/index.ejs"),
            baseUrl: "/"
        })
    ],

    devServer: {
        historyApiFallback: true
    }
}