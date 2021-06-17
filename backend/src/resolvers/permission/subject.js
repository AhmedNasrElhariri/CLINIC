const subject = ({ action }) => {
  return action.split('_')[1];
};

export default subject;
