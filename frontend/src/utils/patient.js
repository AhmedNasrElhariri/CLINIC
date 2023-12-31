export const filterPatientBy = (text, patient = {}, strict = false) => {
  const { name = '', phoneNo = '', phoneNoTwo } = patient;

  const includeText = strict ? !!text : true;
  return (
    includeText &&
    (name.toLowerCase().includes(text.toLowerCase()) ||
      phoneNo.includes(text) ||
      (phoneNoTwo || '').includes(text))
  );
};

export const filterPatients = (text, patients, strict = false) => {
  return patients.filter(p => filterPatientBy(text, p, strict));
};
