import ejs from 'ejs';
import { promises as fsp } from 'fs';
import wkhtmltopdf from 'wkhtmltopdf';

const posthtml = require('posthtml');
const postcss = require('posthtml-postcss');
const autoprefixer = require('autoprefixer');

const postcssPlugins = [autoprefixer()];
const filterType = /^text\/css$/;
const postcssOptions = {};

export const generatePdf = async (path, vairables = {}) => {
  const file = await fsp.readFile(__dirname + path, 'utf8');
  const compiled = ejs.compile(file);
  const html = await posthtml([
    postcss(postcssPlugins, postcssOptions, filterType),
  ])
    .process(compiled(vairables))
    .then(result => result.html);

  return new Promise(async (resolve, reject) => {
    const tempFileName = __dirname + '/' + Date.now() + '.pdf';
    wkhtmltopdf(
      html,
      {
        output: tempFileName,
        pageSize: 'A4',
      },
      async err => {
        if (err) {
          reject(err);
          console.log(err);
        }
        const fileBuffer = await fsp.readFile(tempFileName);
        resolve(fileBuffer);
        fsp.unlink(tempFileName);
      }
    );
  });
};
