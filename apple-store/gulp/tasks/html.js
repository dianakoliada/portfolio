import fileinclude from "gulp-file-include";
import replace from 'gulp-replace';
import versionNumber from "gulp-version-number";

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(fileinclude())
      .pipe(replace(/\/img\//g, '/src/img/'))
      .pipe(
         versionNumber({
            'value': '%DT%',
            'append': {
               'key': '_v',
               'cover': 0,
               'to': [
                  'css',
                  'js',
               ]
            },
            'output': {
               'file': 'gulp/version.json'
            }
         })
      )
      .pipe(app.gulp.dest(app.path.build.html));
}