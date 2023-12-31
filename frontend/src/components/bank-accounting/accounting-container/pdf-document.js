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
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    flexGrow: 1,
  },
  tableContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  profit: {
    marginTop: 30,
  },
});

const PdfTable = ({ data }) => (
  <Table data={data}>
    <TableHeader>
      <TableCell weighting={0.6}>Name</TableCell>
      {/* <TableCell weighting={0.6}>Bank Name</TableCell> */}
      <TableCell weighting={0.2}>Amount</TableCell>
      <TableCell weighting={0.2}>Date</TableCell>
    </TableHeader>
    <TableBody>
      <DataTableCell getContent={r => r.name} weighting={0.6} />
      {/* <DataTableCell getContent={r => r.bank.name} weighting={0.6} /> */}
      <DataTableCell getContent={r => r.amount} weighting={0.2} />
      <DataTableCell getContent={r => formatDate(r.date)} weighting={0.2} />
    </TableBody>
  </Table>
);

const calculateTotal = data =>
  data.reduce((sum, { amount }) => sum + amount, 0);

const PdfDocument = ({
  period,
  data: { revenues, expenses, totalRevenues, totalExpenses },
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  let TotalRevenues = 0,
    TotalExpenses = 0;
  TotalRevenues = totalRevenues ? totalRevenues : calculateTotal(revenues);
  TotalExpenses = totalExpenses ? totalExpenses : calculateTotal(expenses);
  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{
          ...styles.page,
          marginTop: marginTop,
          marginRight: marginRight,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
        }}
      >
        <Text>Accounting Report</Text>
        <Text>
          from {formatDate(period[0])} to {formatDate(period[1])}
        </Text>
        <View style={styles.profit}>
          <Text style={styles.header}>Revenues = {TotalRevenues}</Text>
          <Text style={styles.header}>Expenses = {TotalExpenses}</Text>
          <Text style={styles.header}>
            Profit = {TotalRevenues - TotalExpenses}
          </Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.section}>
            <Text>Revenue</Text>
            <PdfTable data={revenues} />
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.section}>
            <Text>Expenses</Text>
            <PdfTable data={expenses} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

PdfDocument.defaultProps = {
  period: [new Date(), new Date()],
};

export default PdfDocument;
