import { generatePdf } from '@/services/report.service';

const init = app => {
  app.get('/pdf', async (req, res) => {
    try {
      const pdfDoc = await generatePdf('/views/reports/rt.ejs', {
        test: 'ddddddddd',
      });
      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (e) {
      res.status(400).send('Invalid');
    }
  });
};

export default init;
