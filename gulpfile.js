let gulp = require('gulp');  //создаем переменную чтобы подключить скачанный пакет
let jade = require('gulp-jade');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let gulpautoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create(); //ф-ия .create сразу запускает рабочую среду 'browser-sync'

function html_jade(done) {

    gulp.src('./jade/**/*.jade')
            .pipe(jade({
                pretty: true
            }))
            .pipe(gulp.dest('./')); // указываем gulp куда положить скомпилированные HTML файлы

    done();
}

function css_style(done) {

    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init()) //инициализируем файл для sourcemaps
        .pipe(sass({
            errorLogToConsole: true, //даем возможность отображать ошибки при конвертации в css
            outputStyle: 'compressed' //удаляем все пробелы и сжимаем конечный файл css
        }))
        .on('error', console.error.bind(console)) //событие для о
        // тображения ошибок в консоли
        .pipe(gulpautoprefixer({
            overrideBrowserslist: ['last 2 versions'], //проставляем префексы для последних 2-х версий браузеров
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))  //делаем префикс в названии конечного файла
        .pipe(sourcemaps.write('./')) //делаем шифрованную копию изначального файла gulp для отображении в браузере(данную запись нужно делать непосредственно перед указыванием пути конечного файла)
        .pipe(gulp.dest('./css/')) //указываем путь куда кидаем конечный файл
        .pipe(browserSync.stream()); //после всех изменений файлов, динамично отображаем всё в браузере

    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: './' //отслеживаем изменения с корневой папки во всем проекте
        },
        port: 3000 //указываем порт  локального сервера для отображения сайта
    });
    done();
}

function browserReload(done) {
    browserSync.reload(); //ф-ия перезагружает браузер
    done();
}

function watchFiles() {
    gulp.watch('./jade/**/*', html_jade);  //ф-ия для отслеживания изменений всех файлов в проекте (** всех папки и * все файлы)
    gulp.watch('./scss/**/*', css_style);
    gulp.watch('./**/*.html', browserReload);
    gulp.watch('./**/*.php', browserReload);
    gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(sync, watchFiles));  //series запускает функции поочередно
                                                        //parallel запускает функции паралеьно
                                                        // (watchSass будет постоянной сама себя вызывать при любом изменении файлов внутри её функции .watch)

//Примечания:
// gulp.task(css_style); //даем доступ к функции в консоли
// gulp.task(print); //даем доступ к функции в консоли

// exports.default = defaultSomeTask; //новая запись доступа к функции в консоли

