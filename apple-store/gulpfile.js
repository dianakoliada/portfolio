import gulp from 'gulp';
import { path } from './gulp/config/path.js';

global.app = {
   path: path,
   gulp: gulp,
}

import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { copySwiperFileJS, copySwiperFileCSS } from './gulp/tasks/swiperFileCopy.js';


function watcher() {
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
}

const mainTasks = gulp.parallel(html, scss, js, copySwiperFileJS, copySwiperFileCSS);

const dev = gulp.series(reset, mainTasks, watcher);

gulp.task('default', dev);