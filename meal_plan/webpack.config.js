const path = require('path');
<<<<<<< HEAD

=======
var SRC = path.resolve(__dirname, 'jsx');
<<<<<<< HEAD
// branch
>>>>>>> djBranchier
=======
>>>>>>> djBranchier
module.exports = {
  entry: {
    app: './jsx/yaya.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'views/build'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}