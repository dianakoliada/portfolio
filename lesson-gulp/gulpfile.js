// Підключаємо пакети для роботи задач
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");

// Задача перетворення sass на css
gulp.task("sass", () => {
    return gulp
        .src("sass/*.sass")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css/"));
});

// Підключити html файли і сформувати єдиний файл
gulp.task("html", () => {
    return gulp
        .src("*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest("html/"));
});

// Слідкуємо за зміною файлів і викликаємо відповідні задачі
gulp.task("watch", function () {
    gulp.watch("sass/*.sass", gulp.series(["sass"]));
    gulp.watch("*.html", gulp.series(["html"]));
    gulp.watch("blocks/*.html", gulp.series(["html"]));
});

// Стандратна задача для виклику "gulp"
gulp.task("default", gulp.series(["sass", "html", "watch"]));
