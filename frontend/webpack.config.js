const html = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    devtool: "source-map",
    module:{
        rules:[
           {test:/\.styl$/, use:["style-loader", "css-loader", "stylus-loader"]},
           {test:/\.js$/, use:"babel-loader"} 
        ]
    },
    devServer:{
        proxy:{
            "/api": {
                target: "http://localhost:5000/"
            }
        },

        historyApiFallback: true
    },
    plugins: [
        new html({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
          })
    ]
    
}