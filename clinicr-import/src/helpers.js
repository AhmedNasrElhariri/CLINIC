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

const getItems = (choices = [], categoryName, itemName) => {
  const category = choices.find(({ name }) => name === categoryName);
  const item = category.choices.find(({ name }) => name === itemName);
  return item.id;
};

const dataToCreateAppointments = async (
  appointments,
  patientsInfo,
  otherFieldsValues,
  choices,
  nestedFieldId,
  doctorEmailsVsIds
) => {
  let apps = [];
  let appFields = [];
  (appointments || []).forEach(
    ({ phoneNo, date, item, category, cost, payment, remaining, email }) => {
      const patientId = patientsInfo[phoneNo];
      const doctorId = doctorEmailsVsIds[email];
      const itemId = getItems(choices, category, item);
      const appId = uuid();
      const status = email === 'doctor@lushelle.com' ? 'Missed' : 'Archived';

      apps.push({
        date,
        patientId,
        doctorId,
        appId,
        status
      });

      status === 'Archived' &&
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
