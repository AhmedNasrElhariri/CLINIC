const crypto = require('crypto');

const uuid = () => crypto.randomUUID();
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
const returnAppointmentIdAndFieldId = (
  data,
  otherFieldsValues,
  choices,
  appId,
  nestedFieldId
) => {
  let val1 = {
    appId: appId,
    fieldId: getFieldId('Total Cost', otherFieldsValues),
    value: 0,
  };
  let val2 = {
    appId: appId,
    fieldId: getFieldId('Payment', otherFieldsValues),
    value: 0,
  };
  let val3 = {
    appId: appId,
    fieldId: getFieldId('Remaining', otherFieldsValues),
    value: 0,
  };
  let val4 = {
    appId: appId,
    fieldId: nestedFieldId,
    value: [],
  };
  data.forEach(d => {
    const vv = recursiveSearch(choices, d['Item Name'].trim());
    val1['value'] += Number(d['Total Cost']);
    val2['value'] += Number(d['Payment']);
    val3['value'] += Number(d['Remaining']);
    val4['value'] = vv ? [...val4['value'], vv] : val4['value'];
  });
  return [val1, val2, val3, val4];
};
const dataToCreateAppointments = (
  data,
  patientsInfo,
  otherFieldsValues,
  choices,
  nestedFieldId
) => {
  let apps = [];
  let appFields = [];
  (data || []).forEach(({ phoneNo, appointments }) => {
    const patientId = patientsInfo[phoneNo];
    (appointments || []).forEach(({ date, data }) => {
      const appId = uuid();
      apps.push({ date: date, patientId: patientId, appId: appId });
      appFields.push(
        ...returnAppointmentIdAndFieldId(
          data,
          otherFieldsValues,
          choices,
          appId,
          nestedFieldId
        )
      );
    });
  });
  return { apps: apps, appFields: appFields };
};

module.exports = {
  uuid,
  split,
  dataToCreateAppointments,
};
