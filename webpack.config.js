const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);
const publicUrlPath = 'https://www.cbrfc.noaa.gov/dbdata/station/info/nrcsCompare/charts'

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`, 'path is', path.resolve(__dirname, "build"));
    console.log('public url path', publicUrlPath)

    return merge({
        mode,
        entry: "./src/index.js",
        devtool: 'inline-source-map',
        devServer: {
            hot: true,
            open: true
        },
        output: {
            publicPath: "/dbdata/station/info/nrcsCompare/charts/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader'],
                },
                {
                  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                  exclude: /node_modules/,
                  use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
                },
            ]
        },

        plugins: [
          new HtmlWebpackPlugin(
            { 
              template: path.resolve(__dirname, "public", "index.html"),
              favicon: `${publicUrlPath}/public/favicon.ico`,
              // favicon: "./public/favicon.ico",
              filename: `${publicUrlPath}/index.html`,
              manifest: `${publicUrlPath}/public/manifest.json`,
              logo192: `${publicUrlPath}/public/logo192.png`,
              urlPath: JSON.stringify(publicUrlPath)
            }
          )
        ],
    },
        modeConfiguration(mode)
    );
};


// // webpack.config.js
    
// const path = require("path");
// const webpack = require("webpack");
// const { merge } = require("webpack-merge");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);

// module.exports = ({ mode } = { mode: "production" }) => {
//     console.log(`mode is: ${mode}`);

//     return merge(
//         {
//             mode,
//             entry: "./src/index.js",
//             devServer: {
//                 hot: true,
//                 open: true
//             },
//             output: {
//                 publicPath: "/",
//                 path: path.resolve(__dirname, "build"),
//                 filename: "bundle.js"
//             },
//             module: {
//                 rules: [
//                     {
//                         test: /\.(js|jsx)$/,
//                         exclude: /node_modules/,
//                         loader: "babel-loader"
//                     }
//                 ]
//             },
//             plugins: [
//                 new HtmlWebpackPlugin({
//                     template: "./public/index.html"
//                 }),
//                 new webpack.HotModuleReplacementPlugin()
//             ]
//         },
//         modeConfiguration(mode)
//     );
// };

// // // webpack.config.js

// // const path = require("path");
// // const HtmlWebpackPlugin = require("html-webpack-plugin");

// // module.exports = ({ mode } = { mode: "production" }) => {
// //     console.log(`mode is: ${mode}`);

// //     return {
// //             mode,
// //             entry: "./src/index.js",
// //             output: {
// //                 publicPath: "/",
// //                 path: path.resolve(__dirname, "build"),
// //                 filename: "bundled.js"
// //             },
// //             plugins: [
// //                 new HtmlWebpackPlugin({
// //                     template: "./public/index.html"
// //                 }),
// //             ]
// //         }
// // };