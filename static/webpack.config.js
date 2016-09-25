var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		path.resolve(__dirname, 'style', 'bootstrap.scss'),
		'./src/app.js',
	],
	output: { path: __dirname, filename: 'bundle.js', publicPath: '/'},
	watch: true,

	module: {
		loaders: [
		{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
			loader: "file"
		},
		{
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		},
		{test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
		{test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
 ]
	},
};
