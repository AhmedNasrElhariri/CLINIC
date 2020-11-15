import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

import { formatFullDay } from 'utils/date';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
    fontSize: 12,
    fontFamily: 'Cairo'
  },
  header: {
    lineHeight: 2,
    marginBottom: 10,
  },
  table: {
    container: {
      marginTop: 20,
    },
  },
});

const PdfTable = ({ data }) => {
  return (
    <Table data={data}>
      <TableHeader>
        <TableCell weighting={0.2}>Date</TableCell>
        <TableCell weighting={0.8}>Action</TableCell>
      </TableHeader>
      <TableBody>
        <DataTableCell
          getContent={r => formatFullDay(r.date)}
          weighting={0.2}
        />
        <DataTableCell getContent={r => r.body} weighting={0.8} />
      </TableBody>
    </Table>
  );
};

const PdfDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text>Inventory Report</Text>
        </View>

        <View>
          <PdfTable data={data} />
        </View>
      </Page>
    </Document>
  );
};

PdfDocument.defaultProps = {
  period: [new Date(), new Date()],
};

export default PdfDocument;
