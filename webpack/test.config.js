const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const BaseConfig = require("./base.config.js");
const Config = require("./variables.js");

module.exports = function (env) {
	return WebpackMerge(BaseConfig(), {
		devtool: 'inline-source-map',
		plugins: [
			new Webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("test")
				}
			})
		]
	});
};
