const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: 'src/',
  });

  watch('src/styles/scss/**/*.scss', buildSass);
  watch('src/pages/**/*.pug', buildPug);
};

const buildSass = () => {
  console.log('Sass compilation');

  return src('src/styles/scss/style.scss')
    .pipe(sass())
    .pipe(dest('src/styles/'))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  console.log('Pug compilation');

  return src('src/pages/index.pug')
    .pipe(pug())
    .pipe(prettyHtml({ indent_size: 2 }))
    .pipe(dest('src/'))
    .pipe(browserSync.stream());
};

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug);
