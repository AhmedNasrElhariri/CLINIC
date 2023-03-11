const crypto = require('crypto');

const uuid = () => crypto.randomUUID();

const uniqBy = (arr, selector = item => item) => {
  const map = new Map();
  arr.forEach(item => {
    const prop = selector(item);
    if (!map.has(prop)) map.set(prop, item);
  });
  return [...map.values()];
};

const split = (list, chunkSize) => {
  return [...Array(Math.ceil(list.length / chunkSize))].map(_ =>
    list.splice(0, chunkSize)
  );
};

const getFieldId = (name, otherFields) => {
  return otherFields.find(({ name: NAME }) => NAME === name).id;
};

const recursiveSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == target) {
      return arr[i].id;
    }
    if (arr[i].choices && arr[i].choices.length > 0) {
      return recursiveSearch(arr[i].choices, target);
    }
  }
  return null;
};

const dataToCreateAppointments = (
  appointments,
  patientsInfo,
  otherFieldsValues,
  choices,
  nestedFieldId,
  doctorEmailsVsIds
) => {
  let apps = [];
  let appFields = [];
  let i = 0;
  (appointments || []).forEach(
    ({ phoneNo, date, item, cost, payment, remaining, email }) => {
      const patientId = patientsInfo[phoneNo];
      const doctorId = doctorEmailsVsIds[email];
      const itemId = recursiveSearch(choices, item);
      const appId = uuid();
      if (!patientId) {
        console.log('patientId');
        console.log(patientId);
        console.log(phoneNo);
      }
      apps.push({
        date,
        patientId,
        doctorId,
        appId,
      });

      appFields.push(
        ...[
          {
            appId,
            fieldId: getFieldId('Total Cost', otherFieldsValues),
            value: cost,
          },
          {
            appId,
            fieldId: getFieldId('Payment', otherFieldsValues),
            value: payment,
          },
          {
            appId,
            fieldId: getFieldId('Remaining', otherFieldsValues),
            value: remaining,
          },
          {
            appId,
            fieldId: nestedFieldId,
            value: [itemId],
          },
        ]
      );
    }
  );
  return { apps: apps, appFields: appFields };
};

module.exports = {
  uuid,
  split,
  uniqBy,
  dataToCreateAppointments,
};
