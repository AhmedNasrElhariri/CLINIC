import { prisma, UPLOAD_DIR } from '@';
import { createWriteStream } from 'fs';
import path from 'path';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import fs from 'fs';
import shortid from 'shortid';
import toArray from 'stream-to-array';
import B64 from 'b64';
import jpeg from 'jpeg-js';

const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate();

  const url = `${UPLOAD_DIR}/${id}-${filename}`;
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path.join(__dirname, url)))
      .on('finish', () => resolve(url))
      .on('error', reject)
  );
};

const recordFile = file => prisma.file.create({ data: file });

export const processUpload = async upload => {
  const { createReadStream, filename, mimetype, encoding } = await upload;
  const stream = createReadStream();
  const url = await storeUpload({ stream, filename });
  return recordFile({ filename, mimetype, encoding, url });
};

const recordFile2 = (file, url) => {
  const { name: filename, mimetype, encoding } = file;
  return prisma.file.create({ data: { filename, mimetype, url, encoding } });
};

export const upload = async file => {
  const { data, name } = file;
  const id = shortid.generate();
  const url = `${UPLOAD_DIR}/${id}-${name}`;
  // console.log(newFile, 'NNNNNNNN');
  await file.mv(path.join(__dirname, url));

  // let buff = fs.readFileSync(path.join(__dirname, url));
  // let base64data = await buff.toString('base64');
  // fs.writeFileSync(path.join(__dirname, url), base64data);

  // const basedfile = await fs.readFileSync(path.join(__dirname, url), {
  //   encoding: 'base64',
  // });
  // let base64data2 = await basedfile.toString('base64');
  // // let bufffer = await new Buffer(basedfile, 'base64');
  // fs.writeFileSync(path.join(__dirname, url), base64data2, {
  //   encoding: 'base64',
  // });

  // const jpegData = await fs.readFileSync(path.join(__dirname, url));
  // var jpegImageData = await jpeg.encode(jpegData, 1000);
  // const newFile = { width: 1000, height: 1000, data: jpegImageData.data };
  // console.log(jpegImageData, 'jpegImageDatajpegImageData');
  // await newFile.mv(path.join(__dirname, url));
  // await fs.writeFileSync(path.join(__dirname, url), jpegImageData.data);

  // var width = 320,
  //   height = 180;
  // var frameData = new Buffer(width * height * 4);
  // var i = 0;
  // while (i < frameData.length) {
  //   frameData[i++] = 0xff; // red
  //   frameData[i++] = 0x00; // green
  //   frameData[i++] = 0x00; // blue
  //   frameData[i++] = 0xff; // alpha - ignored in JPEGs
  // }
  // var rawImageData = {
  //   data: frameData,
  //   width: width,
  //   height: height,
  // };
  // var jpegImageData = jpeg.encode(rawImageData, 50);
  // fs.writeFileSync(path.join(__dirname, url), jpegImageData.data);
  // console.log(jpegImageData);

  // const jpegData2 = await fs.readFileSync(path.join(__dirname, url));
  // var jpegImageData2 = await jpeg.decode(jpegData2, 50);
  // console.log(jpegImageData2, 'jpegImageDatajpegImageData2');
  // // const newFile = { width: 1000, height: 1000, data: jpegImageData2.data };
  // await fs.writeFileSync(path.join(__dirname, url), jpegImageData2.data);

  // const key = 'secret Key 123838300299283839930030844444449994';
  // const wordArray = CryptoJS.lib.WordArray.create(data);
  // const encrypted = CryptoJS.AES.encrypt(wordArray, key);
  // const r = await fs.createReadStream(path.join(__dirname, url));
  // const w = await fs.createWriteStream(path.join(__dirname, url)); //print the file
  // r.pipe(encrypted).pipe(w);

  // const rr = await fs.createReadStream(path.join(__dirname, url));
  // console.log(rr, 'FILELELE');
  // const decrypt = CryptoJS.AES.decrypt(encrypted, key);
  // const ww = await fs.createWriteStream(path.join(__dirname, url)); //print the file
  // rr.pipe(decrypt).pipe(ww);

  // const key = Buffer.from('5ebe2294ecd0e0f08eab7690d2a6ee69', 'hex');

  // const secret = 'shezhuansauce';
  // let key = crypto
  //   .createHash('sha256')
  //   .update(String(secret))
  //   .digest('base64')
  //   .substr(0, 32);
  // // const BASE_64_KEY = '5ebe2294ecd0e0f08eab7690d2a6ee69';
  // // const key_in_bytes = Buffer.from(BASE_64_KEY, 'base64');
  // const iv = Buffer.from('26ae5cc854e36b6bdfca366848dea6bb', 'hex');
  // const algorithm = 'aes-256-cbc';
  // const cipher = await crypto.createCipheriv(algorithm, key, iv);
  // const r = await fs.createReadStream(path.join(__dirname, url));
  // const w = await fs.createWriteStream(path.join(__dirname, url)); //print the file
  // r.pipe(cipher).pipe(w);

  // const decrypt = await crypto.createDecipheriv(algorithm, key, iv);
  // const response = axios
  //   .get(path.join(__dirname, url))
  //   .then(res => {
  //     const dataa = Buffer.from(res.data, 'binary').toString('base64');
  //     console.log(dataa, 'DATAA');
  //   })
  //   .catch(err => console.log(err, 'ERRRRRR'));

  // const bufferr = Buffer.from(response.data, 'utf-8');
  // console.log(bufferr, 'FFF');
  // let data = JSON.parse(await fs.readFileSync(path.join(__dirname, url)));
  // let encryptedText = Buffer.from(rr, 'hex');

  // let decrypted = decrypt.update(buffer);
  // let decryptedTwo = Buffer.concat([decrypted, decrypt.final()]);
  // console.log(decryptedTwo, 'TTTTTTTTTT');

  // const encryptdata = Buffer.from(rr, 'base64').toString('binary');
  // let decoded = decrypt.update(encryptdata);
  // decoded += decipher.final();
  // const ww = await fs.createWriteStream(path.join(__dirname, url));
  // rr.pipe(ww).pipe(decrypt);

  // var stream = rr.pipe(decrypt);
  // var d = stream.pipe(encoder);
  // d.pipe(process.stdout);
  // var data2 = Buffer.from([]);
  // toArray(stream, function (err, arr) {
  //   if (arr) {
  //     Buffer.isBuffer(arr)
  //       ? (data2 = Buffer.concat(arr))
  //       : (data2 = Buffer.concat(Buffer.from(arr)));
  //   }
  //   console.log(err, arr);
  //   console.log(data2);
  // });
  // console.log(data2, 'outer');
  // let newFile2 = {};
  // let chunk;
  // rr.on('readable', () => {
  //   while (null !== (chunk = decrypt.read())) {
  //     rr += chunk.toString('utf8');
  //   }
  //   console.log(rr, 'DDDDDDDDDDDDDDDDRR');
  // });

  // rr.on('end', () => {
  //   console.log(rr, 'DDDDDDDDDDDDDDDDRR');
  //   // Prints: some clear text data
  // });
  // const stream = r.pipe(decrypt);
  // console.log(r, stream, 'rsrs');
  // let chunk;
  // let newFile = {};
  // let decrypted = '';
  // stream.on('readable', () => {
  //   chunk = stream.read();
  //   if (chunk !== null) {
  //     newFile = { ...file, data: chunk, size: chunk.length };
  //     console.log(newFile);
  //   }
  // });
  // var clearText = decrypt.update(chunk, 'base64', 'utf8');
  // console.log(clearText, 'clearTextclearText');
  // clearText += decrypt.final('utf8');
  // console.log(clearText, 'clearTextclearText');

  // console.log(newFile, 'decrypteddecrypteddecrypteddecrypted');
  // stream.on('end', () => {
  //   console.log(decrypted, 'DDDDDDDDDDDDDDDDDDDBBBBBBBB');
  //   // Prints: some clear text data
  // });

  return recordFile2(file, url);
};
