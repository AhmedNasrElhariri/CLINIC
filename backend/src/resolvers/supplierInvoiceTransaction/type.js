const type = async ({ checkNumber }) => {
  if (checkNumber) {
    return 'Check';
  } else {
    return 'Cash';
  }
};

export default type;
