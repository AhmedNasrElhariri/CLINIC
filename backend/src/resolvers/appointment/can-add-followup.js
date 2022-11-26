const canAddFollowUp = ({ appointmentFollowUpId, session }) => {
  let f = false;
  if (session && session.followUp && appointmentFollowUpId === null) {
    f = true;
  }
  return f;
};

export default canAddFollowUp;
