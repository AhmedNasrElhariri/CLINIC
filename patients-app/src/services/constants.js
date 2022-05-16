import * as R from "ramda";
export const APPT_TYPE = Object.freeze({
  // Examination: "Examination",
  // Followup: "Followup",
  // Course: "Course",
  // Urgent: "Urgent",
  Session: "Session",
  // Surgery: "Surgery",
});

export const getCreatableApptTypes = () => {
  return Object.values(APPT_TYPE).filter((type) => type !== APPT_TYPE.Surgery);
};

export const isUrgent = (appointment) => {
  return R.propEq("type", APPT_TYPE.Urgent)(appointment);
};

export const MIN_EXAMINATION_DURATION = 5;