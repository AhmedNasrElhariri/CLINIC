import React, { useEffect } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

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
      <TableCell weighting={0.2}>Price</TableCell>
      <TableCell weighting={0.2}>Quentity</TableCell>
      <TableCell weighting={0.2}>TotoalPrice</TableCell>
      <TableCell weighting={0.2}>Date</TableCell>
    </TableHeader>
    <TableBody>
      <DataTableCell getContent={r => r.salesDefinition.name} weighting={0.6} />
      <DataTableCell
        getContent={r => r.salesDefinition.price}
        weighting={0.2}
      />
      <DataTableCell getContent={r => r.quantity} weighting={0.2} />
      <DataTableCell getContent={r => r.totalPrice} weighting={0.2} />
      <DataTableCell getContent={r => formatDate(r.date)} weighting={0.2} />
    </TableBody>
  </Table>
);

const calculateTotalSales = data =>
  data.reduce((sum, { totalPrice }) => sum + totalPrice, 0);
const calculateTotalCost = data =>
  data.reduce((sum, { totalCost }) => sum + totalCost, 0);

const PdfDocument = ({ period, data }) => {
  return (
    
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text>Sales Report</Text>
        <Text>
          from {formatDate(period[0])} to {formatDate(period[1])}
        </Text>
        <View style={styles.profit}>
          <Text style={styles.header}>
            Total Sales = {calculateTotalSales(data)}
          </Text>
          <Text style={styles.header}>
            Total Cost = {calculateTotalCost(data)}
          </Text>
          <Text style={styles.header}>
            Profit = {calculateTotalSales(data) - calculateTotalCost(data)}
          </Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.section}>
            <Text>Sales</Text>
            <PdfTable data={data} />
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
