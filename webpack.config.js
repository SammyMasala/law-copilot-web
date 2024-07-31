const DotenvWebpackPlugin = require('dotenv-webpack')
const HtmlWebPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
    const envFile = argv.mode === "production" ? "./env/.env.production" : "./env/.env.staging" 
    
    return {
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
                    test: /\.(css)$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[page].[ext]",
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
        plugins: [
            new HtmlWebPlugin({
                template: "public/index.html"
            }),
            new DotenvWebpackPlugin({
                path: envFile
            }) 
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "dist")
            },
            hot: true,
            open: true 
        }
    }
}