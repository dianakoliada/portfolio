import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
   build: {
      js: `${buildFolder}/js/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      swiperJS: `${buildFolder}/js/`,
      swiperCSS: `${buildFolder}/css/`,
   },
   src: {
      js: `${srcFolder}/js/**/*.js`,
      //js: `${srcFolder}/js/app.js`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      swiperJS: `${srcFolder}/swiper/js/*.*`,
      swiperCSS: `${srcFolder}/swiper/css/*.*`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      swiperJS: `${srcFolder}/swiper/js/*.*`,
      swiperCSS: `${srcFolder}/swiper/css/*.*`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder
}