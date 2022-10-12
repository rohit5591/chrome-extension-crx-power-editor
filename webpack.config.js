const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rimraf = require('rimraf');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs-extra");

module.exports = {
	entry: {
		main: './src/core/index.js',
		panel: './src/extension/panel.js',
		init: './src/extension/init.js'
	},
	mode: 'development',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		// chunkFilename: (pathData) => {
		// 	console.log(pathData.chunk.name);
		// 	return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
		//   },
		  filename: (pathData) => {
				console.log(pathData.chunk.name);
			return pathData.chunk.name === 'main' ? './dist/power-editor/[name].bundle.js' : './dist/[name].js';
		  },
		// path: path.resolve(__dirname, 'dist/power-editor'),
		// filename: '[name].bundle.js'
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
				use: {
					loader: 'file-loader',
					options: {
						name: "[name].[ext]"
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new MonacoWebpackPlugin({ languages: ['css', 'json', 'hbs', 'txt', 'xml', 'properties', 'less', 'scss', 'javascript', 'typescript', 'markdown', 'html'] }),
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
					let files = fs.readdirSync(__dirname + '/dist/power-editor');
					files = files.map(file => 'power-editor/' + file)
					manifest.web_accessible_resources[0].resources = manifest.web_accessible_resources[0].resources.concat(files);
					fs.writeFileSync(__dirname + '/dist/manifest.json', JSON.stringify(manifest, null, "\t"));
				});
			}
		})(),
	]
};