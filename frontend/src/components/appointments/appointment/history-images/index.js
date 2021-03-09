import React, { useState, useCallback, useEffect } from 'react';
import ListImageDocs from './list-image-docs';
import styled from 'styled-components';
import { Form, SelectPicker } from 'rsuite';
import { CRSelectInput } from 'components';
// import useFetchLabDocs from 'hooks/fetch-lab-docs';

let imageDoc = [
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
const HistoryImages = ({ patient }) => {
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
        name="image"
        onSelect={setLab}
        data={imageDoc}
        block
        groupBy="category" 
        style={{ marginTop: '10px', width: '396px', marginLeft: '45px' }}
      />
      <ListImageDocs images={formValue} />
    </>
  );
};

HistoryImages.propTypes = {};

export default HistoryImages;
