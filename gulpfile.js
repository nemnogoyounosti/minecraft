const env = process.env.GULP_ENV || 'development';
const { plugins, webServer, paths} = require('./gulp-config/config');
plugins.init();
const reloadBrowser = plugins.browserSync.reload

const {src, dest, watch, task, series} = plugins.gulp

function buildHtml() {
    return src(paths.html.input)
        .pipe(plugins.twig())
        .pipe(dest(paths.html.output))
        .pipe(reloadBrowser({stream: true}));
}

function buildStyles() {
    return src(paths.styles.input)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCSS())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(dest(paths.styles.output))
        .pipe(reloadBrowser({stream: true}));
}

function collectLibsCss() {
    return simpleCollectFiles(paths.styles.libs.input, paths.styles.libs.output)
}

function buildJavaScript() {
    return src(paths.javascript.input)
        .pipe(plugins.tap(function (file) {
            file.contents = plugins.browserify(file.path, {debug: true}).bundle();
        }))
        .pipe(plugins.buffer())
        .pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(plugins.babel({
            presets: ['@babel/env'],
            "plugins": ["@babel/plugin-proposal-class-properties"]
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(dest(paths.javascript.output))
        .pipe(reloadBrowser({stream: true}));
}

function collectLibsJavaScript() {
    return simpleCollectFiles(paths.javascript.libs.input, paths.javascript.libs.output)
}

function collectImages() {
    return simpleCollectFiles(paths.images.input, paths.images.output)
}

function collectFonts() {
    return simpleCollectFiles(paths.fonts.input, paths.fonts.output)
}

function simpleCollectFiles(input, output) {
    return src(input)
        .pipe(dest(output))
        .pipe(reloadBrowser({stream: true}))
}

function watchFiles() {
    watch(paths.html.watch, buildHtml)
    watch(paths.styles.watch, buildStyles)
    watch(paths.styles.libs.input, collectLibsCss)
    watch(paths.javascript.watch, buildJavaScript)
    watch(paths.javascript.libs.input, collectLibsJavaScript)
    watch(paths.images.input, collectImages)
    watch(paths.fonts.input, collectFonts)
}

task('webserver', done => {
    plugins.browserSync(webServer)
    done()
})

const build = series(buildStyles, collectLibsCss, buildJavaScript, collectLibsJavaScript, collectImages, collectFonts, buildHtml)
let def
if (env === 'development') {
    def = series(build, 'webserver', watchFiles)
} else {
    def = build
}

exports.html = buildHtml
exports.css = buildStyles
exports.vendorCss = collectLibsCss
exports.js = buildJavaScript()
exports.vendorJs = collectLibsJavaScript
exports.images = collectImages
exports.fonts = collectFonts

exports.default = def