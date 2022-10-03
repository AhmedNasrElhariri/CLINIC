import ejs from 'ejs';
import { promises as fsp } from 'fs';
import pdf from 'html-pdf';
const posthtml = require('posthtml');
const postcss = require('posthtml-postcss');
const autoprefixer = require('autoprefixer');

const postcssPlugins = [autoprefixer()];
const filterType = /^text\/css$/;
const postcssOptions = {};
const options = { format: 'A4'};

export const generatePdf = async (path, vairables = {}) => {
  const file = await fsp.readFile(__dirname + path, 'utf8');
  const compiled = ejs.compile(file);
  console.log('step6',new Date());
  const html = await posthtml([
    postcss(postcssPlugins, postcssOptions, filterType),
  ])
    .process(compiled(vairables))
    .then(result => result.html);

  console.log('step7',new Date());
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, res) => {
      if (err) {
        reject(err);
        console.log('err step8',new Date());
      }
      resolve(res);
    });
  });
};
