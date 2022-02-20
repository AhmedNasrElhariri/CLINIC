const payer = ({ patientId }) => {
  if (patientId) {
    return 'Patient';
  } else {
    return '';
  }
};

export default payer;
