import ExcelJS from 'exceljs';

export const generateExcel = (column, rows) => {
  const updatedColumns = column.map(c => {
    return { header: c, key: c, width: 10 };
  });
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Me';
  workbook.lastModifiedBy = 'Her';
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);
  const worksheet = workbook.addWorksheet('sheet', {
    pageSetup: { paperSize: 9, orientation: 'landscape' },
  });
  worksheet.columns = updatedColumns;
  worksheet.addRows(rows);
  return workbook;
};
