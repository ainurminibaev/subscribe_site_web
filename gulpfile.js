"use strict";

var  gulp = require('gulp'),
     minifyCss = require('gulp-minify-css'),
     livereload = require('gulp-livereload'),
     sass = require("gulp-sass"),
     browserSync = require("browser-sync"),
     rigger = require('gulp-rigger'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean');


var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "gulp_frontend"
};


gulp.task('server', function () {
    browserSync(config);
});


gulp.task('css',function(){
        gulp.src('./dev/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./build/css'))
});



gulp.task('html', function () {
    gulp.src('dev/*.html')
        .pipe(rigger())
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/'));
});


gulp.task('js', function () {
    gulp.src('dev/js/*.js')
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});



gulp.task('fonts', function () {
    gulp.src('dev/fonts/*')
        .pipe(gulp.dest('build/fonts/'));
});




gulp.task('watch',function(){
    gulp.watch('dev/css/parts/*.scss',['css']);
    gulp.watch('dev/css/*.scss',['css']);
    gulp.watch('dev/js/*.js',['js']);
    gulp.watch('dev/*.html',['html']);
    gulp.watch('dev/templates/*.html',['html']);
    gulp.watch('dev/fonts/*',['fonts']);
    gulp.watch('dev/img/*',['img']);
});

//gulp.task('img',function(){
//
//    gulp.src('dev/img/*')
//        .pipe(imagemin({
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant()]
//        }))
//        .pipe(gulp.dest('build/img'));
//
//});

gulp.task('clean', function () {
    return gulp.src(['build/fonts',
        //'build/img',
        'build/css','build/js','build/*.html'], {read: false})
        .pipe(clean());
});





gulp.task('default', ['clean'], function(){
    gulp.start(['css', 'html',
        //'img',
        'js','fonts','server', 'watch']);
});

gulp.task('build', ['clean'], function(){
    gulp.start(['css', 'html',
        //'img',
        'js','fonts']);
});