import { processUpload } from '@/services/upload.service';

const singleUpload = (_, { file }) => {
  return processUpload(file);
};

export default singleUpload;
