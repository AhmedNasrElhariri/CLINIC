import ejs from 'ejs';
import fs from 'fs';
import pdf from 'html-pdf';
const posthtml = require('posthtml');
const postcss = require('posthtml-postcss');
const autoprefixer = require('autoprefixer');

const postcssPlugins = [autoprefixer()];
const filterType = /^text\/css$/;
const postcssOptions = {};
const options = { format: 'A4' };

export const generatePdf = async (path, vairables = {}) => {
  const file = await fs.readFileSync(__dirname + path, 'utf8');
  const compiled = ejs.compile(file);

  const html = await posthtml([
    postcss(postcssPlugins, postcssOptions, filterType),
  ])
    .process(compiled(vairables))
    .then(result => result.html).catch(err => console.log(err,'htmlERROR'));
  console.log(html,'html');
  return new Promise((resolve, reject) => {
    pdf.create(html).toBuffer((err, res) => {
      if (err) {
        reject(err);
        console.log(err,'ERR');
      }
      resolve(res);
    });
  });
};
