const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlPartial = require('gulp-html-partial');
const browserSync = require('browser-sync').create();

function commonFonts() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./target/fonts'));
}

function style() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./target/styles'))
        .pipe(browserSync.stream());
}

let options = {
    partial: {
        basePath: './src/mocks/partials/',
        tagName: 'partial',
        variablePrefix: '@@'
    }
}

function htmlMocks() {
    return gulp.src('./src/mocks/**/*.html')
        .pipe(htmlPartial(options.partial))
        .pipe(gulp.dest('./target/mocks'));
}

function scripts() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(gulp.dest('./target/scripts'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "target/",
            directory: true
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./mocks/**/*.html').on('change', browserSync.reload);
    gulp.watch('./src/mocks/partials/*.html').on('change', browserSync.reload);
    gulp.watch('./scripts/**/*.js').on('change', browserSync.reload);
}

function buildSite() {
    commonFonts();
    style();
    scripts();
    htmlMocks();
    watch();
}

exports.fonts = commonFonts;
exports.style = style;
exports.scripts = scripts;
exports.mocks = htmlMocks;
exports.watch = watch;
exports.buildSite = buildSite;