module.exports = {
    entry: "./app/youtube.js",
    output: {
        path: __dirname,
        filename: "./Scripts/app.compiled.js"
    },
    module: {
        loaders: [
            { test: /\.sass$/, loaders: ["style", "css", "sass"] },
            { test: /\.jade$/, loaders: ["babel?presets[]=es2015", "jade"] },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower)/,
                loader: "babel?presets[]=es2015"
            }
        ]
    },
    resolve: {
        root: __dirname,
        moduleDirectories: [__dirname + "/app"],
        alias: {
            "jquery$": __dirname + "/Scripts/jquery-2.2.3.js",
        }
    },
    sassLoader: {
        indentedSyntax: true
    }
};