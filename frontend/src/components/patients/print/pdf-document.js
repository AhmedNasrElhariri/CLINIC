import React from 'react';
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
    fontSize: 12,
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
  patient: {
    box: {
      border: 1,
      padding: 10,
    },
    key: {
      marginBottom: 7,
      fontSize: 14,
    },
  },
  details: {
    container: {
      marginTop: 40,
    },
    group: {
      name: {
        marginBottom: 7,
      },
    },
    field: {
      container: {
        padding: 10,
        flexDirection: 'row',
      },
    },
    appts: {
      container: {
        border: 1,
        padding: 10,
        marginBottom: 30,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      title: {
        fontWeight: 'bold',
      },
      date: {
        marginLeft: 20,
      },
    },
  },
});

const PdfTable = ({ data, fields }) => {
  return (
    <Table data={data}>
      <TableHeader>
        {fields.map(f => (
          <TableCell key={f.id}>{f.name}</TableCell>
        ))}
      </TableHeader>
      <TableBody>
        {fields.map(f => (
          <DataTableCell key={f.id} getContent={r => r[f.id] || '-'} />
        ))}
      </TableBody>
    </Table>
  );
};

const PdfDocument = ({ patient, fields, period, data, details }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text>Patient Report</Text>
          <Text>
            from {formatDate(period[0])} to {formatDate(period[1])}
          </Text>
        </View>
        <View style={styles.patient.box}>
          <Text style={styles.patient.key}>Name : {patient.name}</Text>
          <Text style={styles.patient.key}>Age : {patient.age}</Text>
          <Text style={styles.patient.key}>Sex : {patient.sex}</Text>
          <Text style={styles.patient.key}>Phone No : {patient.phoneNo}</Text>
        </View>

        <View style={styles.table.container}>
          <View style={{}}>
            <Text>Summary</Text>
            <PdfTable data={data} fields={fields} />
          </View>
        </View>

        <View style={styles.details.container}>
          <Text>Details</Text>
          {details.map((appt, idx) => (
            <View key={appt.id} style={styles.details.appts.container}>
              <View style={styles.details.appts.header}>
                <Text style={styles.details.appts.title}>
                  Session {idx + 1}
                </Text>
                <Text style={styles.details.appts.date}>
                  {formatDate(appt.date)}
                </Text>
              </View>
              {appt.data.map(group => (
                <View key={group.id}>
                  <Text style={styles.details.group.name}>{group.name}</Text>
                  {Object.entries(group.fields)
                    .filter(([name, value]) => !!value)
                    .map(([name, value]) => (
                      <View style={styles.details.field.container} key={name}>
                        <Text> - </Text>
                        <Text>{name} : </Text>
                        <Text> {value}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

PdfDocument.defaultProps = {
  period: [new Date(), new Date()],
};

export default PdfDocument;
