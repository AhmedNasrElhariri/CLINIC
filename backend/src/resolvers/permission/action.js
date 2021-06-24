const action = ({ action }) => {
  return action.split('_')[0];
};

export default action;
