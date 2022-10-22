const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rimraf = require('rimraf');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs-extra");
const manifest_exclude = ["icon.png", "index.html", "LICENSE", "panel.js", "panel.css", "README.md"];

module.exports = {
	entry: {
		main: './src/core/power-editor/index.js',
		panel: './src/core/extension/panel.js',
		init: './src/core/extension/init.js'
	},
	mode: 'production',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
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
				test: /\.(ttf|png)$/,
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
				{ from: "./src/resources", to: path.resolve(__dirname, 'dist') },
			],
		}),
		new (class {
			apply(compiler) {
				compiler.hooks.done.tap('Adjust files', () => {
					console.log('Remove LICENSE.txt');
					rimraf.sync('./dist/**/*.LICENSE.txt');
					console.log('Adjust manifest');
					let manifest = JSON.parse(fs.readFileSync('./src/core/extension/manifest.json', { encoding: 'utf8' }));
					let files = fs.readdirSync(__dirname + '/dist');
					var packageJson = require('./package.json');
					manifest.version = packageJson.version;
					manifest.name = packageJson['extension-name'];
					manifest.author = packageJson.author;
					manifest.description = packageJson.description;
					files = files.filter(file => manifest_exclude.indexOf(file) === -1)
					manifest.web_accessible_resources[0].resources = manifest.web_accessible_resources[0].resources.concat(files);
					fs.writeFileSync(__dirname + '/dist/manifest.json', JSON.stringify(manifest, null, "\t"));
				});
			}
		})(),
	]
};