export const copySwiperFileJS = () => {
   return app.gulp.src(app.path.src.swiperJS)
      .pipe(app.gulp.dest(app.path.build.js));
};

export const copySwiperFileCSS = () => {
   return app.gulp.src(app.path.src.swiperCSS)
      .pipe(app.gulp.dest(app.path.build.css));
};