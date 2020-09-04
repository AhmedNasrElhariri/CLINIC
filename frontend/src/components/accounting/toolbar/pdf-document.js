import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

import { formatDate } from 'utils/date';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfTable = ({ data }) => (
  <Table data={data}>
    <TableHeader>
      <TableCell>Name</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Date</TableCell>
    </TableHeader>
    <TableBody>
      <DataTableCell getContent={r => r.name} />
      <DataTableCell getContent={r => r.amount} />
      <DataTableCell getContent={r => formatDate(r.date)} />
    </TableBody>
  </Table>
);

const PdfDocument = ({ data: { revenues, expenses } }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Revenue</Text>
          <PdfTable data={revenues} />
        </View>
        <View style={styles.section}>
          <Text>Expenses</Text>
          <PdfTable data={expenses} />
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
