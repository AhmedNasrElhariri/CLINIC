const path = require('path');
const { nanoid } = require('nanoid');
const XLSX = require('xlsx');
const { uniqBy } = require('./helpers');

const PATIENTS_HISTORY_PATH = path.resolve(
  __dirname,
  // './files/Book1.xlsx'
  './files/patients_history.xlsx'
);
const INVALID_PATIENTS_PATH = path.resolve(
  __dirname,
  './files/invalid_patients.xlsx'
);
const INVALID_PATIENTS_HISTORY_PATH = path.resolve(
  __dirname,
  './files/invalid_patients_history.xlsx'
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
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);
  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  const validData = data
    .filter(row => row['Name'] && row['Mobile No'])
    .map(p => ({
      name: p['Name'].trim(),
      code: (p['Code'] || '').trim(),
      phoneNo: p['Mobile No'].trim(),
      sex: 'Female',
    }));

  const invalidData = data.filter(row => !row['Name'] || !row['Mobile No']);

  await exportInvalidData(invalidData, INVALID_PATIENTS_PATH);

  const uniqueData = uniqBy(validData, ({ phoneNo }) => phoneNo);
  console.log('Valid patients: ' + uniqueData.length);
  console.log('Invalid patients: ' + invalidData.length);
  return uniqueData;
};

const importDoctors = async () => {
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);
  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  const doctors = data
    .filter(row => row['Doctor Name'])
    .map(p => ({
      name: p['Doctor Name'].trim(),
      email: p['Email'].trim(),
    }));

  const uniqueData = uniqBy(doctors, ({ name }) => name);
  return uniqueData;
};

const extractCategoriesAndItems = async () => {
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);

  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  const categories = getCategoriesAndItems(groupBy(data, 'Category'));
  return categories;
};

const exportInvalidData = async (rows, url) => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Invalid Data');

  XLSX.writeFile(workbook, url, {
    compression: true,
  });
};

const extractAppointmentsData = async () => {
  const file = XLSX.readFile(PATIENTS_HISTORY_PATH);

  const data = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {
    raw: false,
    dateNF: 'yyyy-mm-dd',
  });
  const validData = data
    .filter(
      row =>
        row['Category'] && row['Item Name'] && row['Name'] && row['Mobile No']
    )
    .map(row => ({
      phoneNo: row['Mobile No'].trim(),
      date: row['History Date'],
      category: row['Category'].trim(),
      item: row['Item Name'].trim(),
      cost: Number(row['Cost']) || 0,
      payment: Number(row['Payment']) || 0,
      remaining: Number(row['Remaining']) || 0,
      email: row['Email'].trim(),
    }));

  const invalidData = data.filter(
    row =>
      !row['Category'] || !row['Item Name'] || !row['Name'] || !row['Mobile No']
  );

  console.log('Valid Appointments Rows: ' + validData.length);
  console.log('Invalid Appointments Rows: ' + invalidData.length);

  await exportInvalidData(invalidData, INVALID_PATIENTS_HISTORY_PATH);
  return validData;
};

module.exports = {
  importPatients,
  importDoctors,
  extractCategoriesAndItems,
  extractAppointmentsData,
};
