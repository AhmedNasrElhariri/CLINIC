import { prisma, UPLOAD_DIR } from '@';
import { createWriteStream } from 'fs';
import path from 'path';

import shortid from 'shortid';

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

// const recordFile = file => db.get('uploads').push(file).last().write();
const recordFile = file => prisma.file.create({ data: file });

export const processUpload = async upload => {
  const { createReadStream, filename, mimetype, encoding } = await upload;
  const stream = createReadStream();
  const url = await storeUpload({ stream, filename });
  return recordFile({ filename, mimetype, encoding, url });
};
