import webpack from "webpack-stream";
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

export const js = () => {
   return app.gulp.src(app.path.src.js, { sourcemaps: true })
      .pipe(webpack({
         mode: 'development',
         output: {
            filename: 'app.min.js',
         }
      }))
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(app.gulp.dest(app.path.build.js));
};