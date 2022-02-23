import React, { useMemo } from 'react';
import { CRTextInput, Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { ALL_AREAS } from 'apollo-client/queries';
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
const PatientsFilter = ({
  formValue,
  setFormValue,
  areaFormValue,
  setAreaFormValue,
}) => {
  const { data } = useQuery(ALL_AREAS);
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const newAreas = areas.map(a => {
    return {
      id: a.id,
      name: a.city_name_en,
    };
  });
  const setAreaValue = val => {
    const area = newAreas.find(a => a.id == val);
    setFormValue({ ...formValue, area: area.name });
    setAreaFormValue({ ...areaFormValue, areaId: val });
  };
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex" justifyContent="space-between">
        <Div mr={3}>
          <CRTextInput
            label="Name  Or  Code"
            name="name"
            placeholder="Search"
            style={{ width: '200px' }}
          />
        </Div>
        <CRTextInput
          label="Phone Number"
          name="phoneNo"
          placeholder="Search"
          style={{ width: '200px' }}
        />
        <Div ml={3} mr={3}>
          <CRSelectInput
            label="Reference"
            name="reference"
            data={options}
            onChange={val =>
              val == null ? setFormValue({ ...formValue, reference: '' }) : ''
            }
            style={{ width: '200px' }}
          />
        </Div>
        <Div>
          <CRSelectInput
            label="Area"
            name="area"
            data={newAreas}
            value={areaFormValue.areaId}
            style={{ width: '200px' }}
            onChange={val =>
              val == null
                ? (setFormValue({ ...formValue, area: '' }),
                  setAreaFormValue({ areaId: null }))
                : setAreaValue(val)
            }
          />
        </Div>
      </Div>
    </Form>
  );
};

export default PatientsFilter;
