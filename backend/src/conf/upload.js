import fileUpload from 'express-fileupload';
import { upload } from '@/services/upload.service';
const init = app => {
  app.use(fileUpload());
  app.post('/upload', async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const areMultipleFiles = Array.isArray(req.files.file);
    const files = areMultipleFiles ? req.files.file : [req.files.file];
    console.log(files,'files/ff')
    const response = await Promise.all(files.map(f => upload(f)));
    res.send(response);
  });
};

export default init;
