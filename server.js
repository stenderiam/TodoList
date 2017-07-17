const fs = require('fs');
const browserify = require('browserify');

browserify('./index.js')
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(fs.createWriteStream('dist/bundle.js'));
