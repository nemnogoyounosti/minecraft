const plugins = {
    gulp: require('gulp'),
    sass: require('gulp-sass')(require('node-sass')),
    autoprefixer: require('gulp-autoprefixer'),
    sourcemaps: require('gulp-sourcemaps'),
    cleanCSS: require('gulp-clean-css'),
    babel: require('gulp-babel'),
    browserify: require('browserify'),
    tap: require('gulp-tap'),
    buffer: require('gulp-buffer'),
    uglify: require('gulp-uglify'),
    twig: require('gulp-twig'),
    browserSync: require("browser-sync"),
    init: function () {
        this.sass.compiler = require('node-sass');
    }
}

const paths = {
    html: {
        input: 'src/html/*.twig',
        output: 'build/',
        watch: 'src/html/**/*.*'
    },
    styles: {
        input: 'src/css/*.scss',
        output: 'build/css/',
        watch: 'src/css/**/*.scss',
        libs: {
            input: 'src/libs/css/*.css',
            output: 'build/css/libs/',
        }
    },
    javascript: {
        input: 'src/js/*.js',
        output: 'build/js/',
        watch: 'src/js/**/*.*',
        libs: {
            input: 'src/libs/js/*.js',
            output: 'build/js/libs/',
        }
    },
    images: {
        input: 'src/images/**/*.*',
        output: 'build/images/',
        watch: 'src/images/**/*.*',
    },
    fonts: {
        input: 'src/fonts/*.*',
        output: 'build/css/fonts/',
        watch: 'src/fonts/*.*',
    },
}

const webServer = {
    server: {
        baseDir: './build'
    },
    tunnel: false,
    host: 'localhost',
    port: 8000,
    logPrefix: 'by_Jeka'
}

module.exports = { plugins, paths, webServer }