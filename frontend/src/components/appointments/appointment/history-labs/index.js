import React, { useState, useCallback, useEffect } from 'react';
import ListLabDocs from './list-lab-docs';
import { Form, SelectPicker } from 'rsuite';

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
    category: 'A'
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
    category: 'B'
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
    category: 'A'
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
    category: 'A'
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
    category: 'B'
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
    category: 'B'
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
    category: 'A'
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
  return (
    <>
      <SelectPicker
        virtualized={false}
        name="lab"
        onSelect={setLab}
        data={labDocs}
        block
        groupBy="category" 
        style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
      />
      <ListLabDocs labs={formValue} />
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
