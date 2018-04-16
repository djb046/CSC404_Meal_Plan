const path = require('path');
var SRC = path.resolve(__dirname, 'jsx');
module.exports = {
  entry: {
    dashboard: './jsx/dashboard.jsx',
    login: './jsx/login.jsx',
    survey: './jsx/survey.jsx',
    create: './jsx/createNewMealPlan.jsx',
    view: './jsx/viewMealPlan.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'views/build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.(jpe?g|png|gif|mp3)$/,
        include: SRC,
        loaders: ['file-loader']
      }

    ]
  }
}