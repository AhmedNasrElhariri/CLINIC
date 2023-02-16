import ExcelJS from 'exceljs';

export const generateExcel = (column,sheetNames, rows, rows2) => {
  const updatedColumns = column.map(c => {
    return { header: c, key: c, width: 10 };
  });
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Me';
  workbook.lastModifiedBy = 'Her';
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);
  const worksheet = workbook.addWorksheet(sheetNames[0], {
    pageSetup: { paperSize: 9, orientation: 'landscape' },
  });
  if (rows2) {
    const worksheetTwo = workbook.addWorksheet(sheetNames[1], {
      pageSetup: { paperSize: 9, orientation: 'landscape' },
    });
    worksheetTwo.columns = updatedColumns;
    worksheetTwo.addRows(rows2);
  }

  worksheet.columns = updatedColumns;
  worksheet.addRows(rows);

  return workbook;
};
