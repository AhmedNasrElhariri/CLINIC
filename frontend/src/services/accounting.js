export const getNameByType = appointment => {
  return `${getNameShortcut(appointment.type)} - ${appointment.patient.name}`;
};

export const getName = ({ session, appointment }) => {
  return `${getNameShortcut(session.name)} - ${appointment.patient.name}`;
};

export const getNameShortcut = name => {
  const shortcuts = {
    Examination: 'E',
    Followup: 'F',
    Urgent: 'U',
    Session: 'S',
  };
  return shortcuts[name] || name;
};

