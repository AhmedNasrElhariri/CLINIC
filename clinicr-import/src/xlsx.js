const path = require('path');
const { nanoid } = require('nanoid');
const XLSX = require('xlsx');

const PATIENTS_PATH = path.resolve(__dirname, './files/patients.xlsx');
const PATIENTS_HISTORY_PATH = path.resolve(
  __dirname,
  './files/patients_history.xlsx'
);

const groupBy = (arr, prop) => {
  return arr.reduce((acc, arr) => {
    const propName = (arr?.[prop] || '').trim();
    const group = acc[propName] || [];
    return {
      ...acc,
      ...(propName ? { [propName]: [...group, { ...arr }] } : {}),
    };
  }, {});
};

const onlyUnique = arr => {
  return arr.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
};

const getCategoriesAndItems = groupedCategories => {
  return Object.entries(groupedCategories).map(([name, rows]) => {
    const choices = onlyUnique(
      rows
        .filter(({ 'Item Name': itemName }) => itemName)
        .map(({ 'Item Name': itemName }) => itemName.trim())
    );
    return {
      id: nanoid(),
      name,
      choices: choices.map(name => ({ id: nanoid(), name })),
    };
  });
};

const importPatients = async () => {
  const file = XLSX.readFile(PATIENTS_PATH);

  const data = XLSX.utils
    .sheet_to_json(file.Sheets[file.SheetNames[0]])
    .filter(p => p['Customer Name'])
    .map(p => ({
      name: p['Customer Name'],
      code: p['Customer Code'],
      phoneNo: p['Mobile No'],
      sex: 'Female',
    }));
  return data;
};

const extractCategoriesAndItems = async () => {
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);

  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  const categories = getCategoriesAndItems(groupBy(data, 'Category'));
  return categories;
};

const extractAppointmentsData = async () => {
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);

  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {
    raw: false,
    dateNF: 'yyyy-mm-dd',
  });
  const groupedByPhoneNo = groupBy(data, 'Mobile No');
  const appointmentsWithData = Object.entries(groupedByPhoneNo).map(
    ([phoneNo, appointments]) => {
      const groupAppointmentsByData = groupBy(appointments, 'History Date');
      const data = Object.entries(groupAppointmentsByData).map(
        ([date, data]) => ({
          date,
          data: data.filter(({ Category }) => !!Category),
        })
      );
      return {
        phoneNo,
        appointments: data,
      };
    }
  );
  return appointmentsWithData;
};

module.exports = {
  importPatients,
  extractCategoriesAndItems,
  extractAppointmentsData,
};
