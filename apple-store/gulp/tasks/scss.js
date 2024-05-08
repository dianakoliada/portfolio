import dartSass from 'sass';
import gulpSaas from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSaas(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(plumber())
      .pipe(sass({
         outputStyle: 'expanded',
         errLogToConsole: true
      }))
      .pipe(groupCssMediaQueries())
      .pipe(webpcss(
         {
            webpClass: ".webp",
            noWebpCass: ".no-webp"
         }
      ))
      .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist: ["last 3 versions"],
         cascade: true
      }))
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(concat('style.min.css'))
      .pipe(app.gulp.dest(app.path.build.css));
}