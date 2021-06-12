import React, { useState, useEffect } from 'react';
import { CRTextInput, Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';
import * as R from 'ramda';
import fetch from 'node-fetch';
const getData = async () => {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Egyptcities_City?limit=10000&keys=name,cityId',
    {
      headers: {
        'X-Parse-Application-Id': 'xuOlHpX8MZ1FEq09w2vzqgy4HCorRoFvSuylRfki', // This is your app's application id
        'X-Parse-REST-API-Key': 'Th6myPQRCNvZ8xhJh3PC25MVKOrWSxn7VBMQXGSt', // This is your app's REST API key
      },
    }
  );
  const data = await response.json();
  return data;
};
const options = [
  { name: 'FaceBook', id: 'facebook' },
  { name: 'Instagram', id: 'instagram' },
  { name: 'Twitter', id: 'twitter' },
  { name: 'Internet', id: 'Internet' },
  { name: 'BillBoard', id: 'billboard' },
  { name: 'Another Doctor', id: 'another doctor' },
  { name: 'Others', id: 'others' },
  { name: 'Friends', id: 'friends' },
  
];
const PatientsFilter = ({ formValue, setFormValue }) => {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    getData().then(result => {
      const newResult = R.propOr([], 'results')(result);
      const updatedData = newResult.map(d => {
        return {
          id: d.name,
          name: d.name,
        };
      });
      setAreas(updatedData);
    });
  }, []);
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRTextInput
            label="Name"
            name="name"
            placeholder="Search"
            width={300}
          />
        </Div>
        <CRTextInput
          label="Phone Number"
          name="phoneNo"
          placeholder="Search"
          width={300}
        />
        <Div ml={3} mr={3}>
          <CRSelectInput
            label="Reference"
            name="reference"
            data={options}
            style={{ width: '300px' }}
          />
        </Div>
        <Div>
          <CRSelectInput
            label="Area"
            name="area"
            data={areas}
            style={{ width: '300px' }}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default PatientsFilter;
