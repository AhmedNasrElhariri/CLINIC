import React, { useState, useCallback, useEffect } from 'react';
import ListLabDocs from '../list-lab-docs';
import styled from 'styled-components';
import { Form, SelectPicker } from 'rsuite';
import { CRSelectInput } from 'components';
// import useFetchLabDocs from 'hooks/fetch-lab-docs';

let labDocs = [
  {
    label: 'lab1',
    value: {
      id: '1',
      name: 'lab1',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab2',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab3',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab4',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab5',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab6',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
  {
    label: 'lab7',
    value: {
      id: '2',
      name: 'lab2',
      date: '22-10-2020',
      resultValue: '12-1',
      results: 'view Image',
    },
  },
];
const HistoryLabs = ({ patient }) => {
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState([]);
  const [lab, setLab] = useState({});
  useEffect(() => {
    if (Object.keys(lab).length != 0) {
      setFormValue([...formValue, lab]);
    }
  }, [lab]);
  //   const { labDocs, updateCache } = useFetchLabDocs(patient);
  //   const [filter, setFilter] = useState('');
  //   const filteredLabs = useMemo(
  //     () =>
  //       labDocs.filter(lab =>
  //         lab.name.toLowerCase().includes(filter.toLowerCase())
  //       ),
  //     [filter, labDocs]
  //   );
  return (
    <>
      {/* <LabsFilter onNameChange={setFilter}></LabsFilter> */}

      <SelectPicker
        virtualized={false}
        name="lab"
        onSelect={setLab}
        data={labDocs}
        block
        style={{ marginTop: '10px', width: '396px', marginLeft: '63px' }}
      />

      <ListLabDocs labs={formValue} />
      {/* <AddLabDocs
        show={visible}
        onCancel={() => setVisible(false)}
        onAdded={newDoc => {
          setVisible(false);
          updateCache([newDoc, ...labDocs]);
        }}
        patient={patient}
        labs={labDocs}
      /> */}
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
