import { prisma, UPLOAD_DIR } from '@';
import { createWriteStream } from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import fs from 'fs';
import shortid from 'shortid';
import toArray from 'stream-to-array';
import B64 from 'b64';
const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate();

  const url = `${UPLOAD_DIR}/${id}-${filename}`;
  console.log(stream, 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
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
  console.log(file, 'filefileFF');
  return prisma.file.create({ data: { filename, mimetype, url, encoding } });
};

export const upload = async file => {
  const { name } = file;
  // const formData = new FormData();

  // const key = 'secret Key 123';
  // const wordArray = CryptoJS.lib.WordArray.create(data);
  // console.log(wordArray, 'wordArraywordArray');
  // const encrypted = CryptoJS.AES.encrypt(wordArray, key);
  // const newFile = {
  //   ...file,
  //   data: encrypted,
  //   size: data.length,
  // };
  // const { name } = newFile;
  const id = shortid.generate();
  const url = `${UPLOAD_DIR}/${id}-${name}`;
  // console.log(newFile, 'NNNNNNNN');
  file.mv(path.join(__dirname, url));

  const key = Buffer.from('5ebe2294ecd0e0f08eab7690d2a6ee69', 'hex');
  const BASE_64_KEY = '5ebe2294ecd0e0f08eab7690d2a6ee69';
  const key_in_bytes = Buffer.from(BASE_64_KEY, 'base64');
  const iv = Buffer.from('26ae5cc854e36b6bdfca366848dea6bb', 'hex');
  const algorithm = 'aes-256-cbc';
  const cipher = await crypto.createCipheriv(algorithm, key_in_bytes, iv);
  const r = await fs.createReadStream(path.join(__dirname, url));
  const w = await fs.createWriteStream(path.join(__dirname, url)); //print the file
  // start pipe
  r.pipe(cipher).pipe(w);

  const decrypt = await crypto.createDecipheriv(algorithm, key_in_bytes, iv);
  const rr = await fs.createReadStream(path.join(__dirname, url));
  const ww = await fs.createWriteStream(path.join(__dirname, url));
  rr.pipe(decrypt).pipe(ww);

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
