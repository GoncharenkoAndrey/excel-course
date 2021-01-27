const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const isDevelopment = !isProduction;
const filename = extension => isProduction ? `bundle.[hash].${extension}` : `bundle.${extension}`;
const jsLoaders = () => {
	const loaders = [
	{
		loader: "babel-loader",
		options: {
			presets: ["@babel/preset-env"],
			plugins: ["@babel/plugin-syntax-class-properties", "@babel/plugin-proposal-class-properties"]
		}
    }];
    return loaders;
}
const hot = isDevelopment ? new webpack.HotModuleReplacementPlugin() : undefined;
module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: ["@babel/polyfill","./index.js"],
	output: {
		filename: filename("js"),
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@core": path.resolve(__dirname, "src/core")
		}
	},
	devtool: isDevelopment ? "source-map" : false,
	devServer: {
		port: 5000,
		hot: isDevelopment
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: "index.html",
			minify: {
				removeComments: isProduction,
				collapseWhitespace: isProduction
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
			{
				from: path.resolve(__dirname, "src/favicon.ico"),
				to: path.resolve(__dirname, "dist")
			}
		]}),
		new MiniCssExtractPlugin(
		{
			filename: filename("css")
		}),
		hot,
		new ESLintPlugin({
			context: path.resolve(__dirname, "src"),
			eslintPath: "eslint",
			extensions: ["js"]
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				"css-loader",
				"sass-loader"
        	],
      	},
      	{
        	test: /\.m?js$/,
        	exclude: /node_modules/,
        	use: jsLoaders()
      	}
    	],
	}
};
