import CryptoJS from 'crypto-js';
const phoneNo = async ({ phoneNo }) => {
  const decryptedPhoneNo = await CryptoJS.AES.decrypt(
    phoneNo,
    'secret key 123'
  );
  const originalPhoneNo = await decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
  return originalPhoneNo;
};

export default phoneNo;
