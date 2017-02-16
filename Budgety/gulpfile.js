// including plugins
var gulp = require('gulp')
var uglify = require("gulp-uglify");// takes the javascript files and concat them then minifies it.
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');
var handlebars = require('handlebars');
var handlebarslib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

//image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

//file paths 
var jsFiles = ['./models/budget.model.js', 
                './shared/dom.strings.js', 
                './interfaces/account.interface.js', 
                './components/budget.component/expense.component.js', 
                './components/budget.component/income.component.js' , 
                './components/budget.component/budget.component.js', 
                './components/ui.component/ui.component.js', 
                './controllers/app.controller.js', 
                './app.component.js'];

var cssFiles = ['styles/**/*.css', ];
var destFolder = './dist';
var imageFiles = './images/**/*.{png,jpeg,jpg,svg,gif}'

// Styles
gulp.task('styles', function() {
    return gulp.src(cssFiles)
            .pipe(plumber(function() {
                console.log('styles task error');
                //console.log(err);
                this.emit('end'); //stop the task without stopping gulp
            }))            // handle the errors.
            .pipe(sourcemaps.init()) //this will let the process know what the files looked like before concat and minify

            .pipe(autoprefixer())
            .pipe(concat('styles.css')) // Take all the css files in place it on one file called styles.css
            .pipe(minifyCSS())
            .pipe(sourcemaps.write()) // it writes ithe info in the new file given what was in the looked like before.
            .pipe(gulp.dest(destFolder))
            .pipe(livereload())         
});

// Build Task
gulp.task('build', function () {
    gulp.src(jsFiles) // path to your files
    .pipe(plumber(function() {
        console.log('build task error');
        //console.log(err);
        this.emit('end'); //stop the task without stopping gulp
    }))  
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify()) //make the file as small as possible
    .pipe(concat('scripts.js')) //get all the files in put it in one file
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destFolder))
    .pipe(livereload());
});

gulp.task('images', function() {
    return gulp.src(imageFiles)
            .pipe(plumber(function() {
                console.log('image task error');
                //console.log(err);
                this.emit('end'); //stop the task without stopping gulp
            }))  
            .pipe(imagemin(
                [
                    imagemin.gifsicle(),
                    imagemin.jpegtran(),
                    imagemin.optipng(),
                    imagemin.svgo(),
                    //imageminPngquant(), // Not working
                    imageminJpegRecompress()
                ]
            ))
            .pipe(gulp.dest(destFolder + '/images'))    
});

gulp.task('templates', function() {
    // body
});

gulp.task('watch', function () {
    require('./server.js'); //start the server.
    livereload.listen(); //start the server
    gulp.watch(jsFiles, ['build']); // call the build task.
    gulp.watch(cssFiles, ['styles']); // call the styles task when there is a change in cssFile path.
    gulp.watch(imageFiles, ['images']);
});

gulp.task('clean', function() {
    return del.sync([
        destFolder
    ]);    
});

gulp.task('export', function() {
    return gulp.src('./dist/**/*')
            .pipe(zip('website.zip')) 
            .pipe(gulp.dest('./'))   
});

gulp.task('default', ['clean', 'images', 'styles', 'build', 'export'], function() {
    
});


