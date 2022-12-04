export const createDescription = ({ name, form, concentration }) => {
  return `${name} ( ${form} ${concentration ? ' - ' + concentration : ''} )`;
};
