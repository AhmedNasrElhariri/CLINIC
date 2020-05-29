import { processUpload } from '@/services/upload.service';

const multipleUpload = (_, { files }) => {
  return Promise.all(files.map(processUpload));
};

export default multipleUpload;
