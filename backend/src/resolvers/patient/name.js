import CryptoJS from 'crypto-js';
const name = async ({ name }) => {
  const decryptedName = await CryptoJS.AES.decrypt(name, 'secret key 123');
  const originalName = await decryptedName.toString(CryptoJS.enc.Utf8);
  return originalName;
};

export default name;
