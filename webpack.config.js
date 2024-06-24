const HtmlWebPlugin = require('html-webpack-plugin')
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },    
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000
        }
    },
    plugins: [
        new HtmlWebPlugin({
            template: "public/index.html"
        }),        
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        hot: true,
        open: true        
    }

}
