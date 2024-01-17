module.exports = () => ({
  module: {
      rules: [
          {
              test: /\.sa?css$/,
              use: ["style-loader", "css-loader", "sass-loader"]
          }
      ]
  }
});

// build_utils/webpack.development.js