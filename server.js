let fs = require("fs");
let browserify = require("browserify");
browserify("./index.js")
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(fs.createWriteStream("dist/bundle.js"));
