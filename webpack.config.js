const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/core/index.js',
    mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist/vs'),
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [new MonacoWebpackPlugin({languages: ['css', 'less', 'scss', 'javascript', 'typescript', 'markdown', 'html']})]
};