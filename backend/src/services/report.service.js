import htmlToPdfmake from 'html-to-pdfmake';
import PdfPrinter from 'pdfmake';
import jsdom from 'jsdom';
import ejs from 'ejs';
import { promises as fsp } from 'fs';

const { JSDOM } = jsdom;
const { window } = new JSDOM('');

const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

const printer = new PdfPrinter(fonts);
const options = {};

export const generatePdf = async (path, vairables = {}) => {
  const file = await fsp.readFile(__dirname + path, 'utf8');
  const compiled = ejs.compile(file);
  const html = htmlToPdfmake(compiled(vairables), { window });
  const docDefinition = {
    content: [html],
    defaultStyle: {
      font: 'Helvetica',
    },
  };

  return printer.createPdfKitDocument(docDefinition, options);
};
