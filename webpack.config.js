const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rimraf = require('rimraf');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs-extra");

module.exports = {
	entry: './src/core/index.js',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist/power-editor'),
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.ttf$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "app.css",
		}),
		new MonacoWebpackPlugin({ languages: ['css', 'json', 'hbs', 'properties', 'less', 'scss', 'javascript', 'typescript', 'markdown', 'html'] }),
		new CopyPlugin({
			patterns: [
				{ from: "./src/extension", to: "../." },
			],
		}),
		new (class {
			apply(compiler) {
				compiler.hooks.done.tap('Adjust files', () => {
					console.log('Remove LICENSE.txt');
					rimraf.sync('./dist/**/*.LICENSE.txt');
					console.log('Adjust manifest');
					let manifest = JSON.parse(fs.readFileSync('./src/core/manifest-template.json', { encoding: 'utf8' }));
					
					console.log(manifest.web_accessible_resources.resources);
				});
			}
		})(),
	]
};