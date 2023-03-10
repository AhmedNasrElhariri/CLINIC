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
    if (!vv) {
      console.log(vv);
    }
    val1['value'] += Number(d['Total Cost']) || 0;
    val2['value'] += Number(d['Payment']) || 0;
    val3['value'] += Number(d['Remaining']) || 0;
    val4['value'] = vv ? [...val4['value'], vv] : val4['value'];
  });
  console.log(val1, val2, val3, val4);
  return [val1, val2, val3, val4];
};
const dataToCreateAppointments = (
  data,
  patientsInfo,
  otherFieldsValues,
  choices,
  nestedFieldId,
  doctorEmailsVsIds
) => {
  let apps = [];
  let appFields = [];
  let i = 0;
  (data || []).forEach(({ phoneNo, appointments }) => {
    i++;
    const patientId = patientsInfo[phoneNo];
    (appointments || []).forEach(({ date, data: history }) => {
      const appId = uuid();
      const email = history[0].Email;
      apps.push({
        date,
        patientId,
        doctorId: doctorEmailsVsIds[email],
        appId,
      });
      appFields.push(
        ...returnAppointmentIdAndFieldId(
          history,
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
  uniqBy,
  dataToCreateAppointments,
};
