import React, { useMemo } from 'react';
import { CRTextInput, Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { ALL_AREAS } from 'apollo-client/queries';
import { useTranslation } from 'react-i18next';
import { get } from 'services/local-storage';

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
  const dir = get('dir');
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const { t } = useTranslation();
  const newAreas = useMemo(() => {
    let newareas = [];
    if (dir === 'ltr') {
      newareas = areas.map(a => {
        return {
          id: a.city_name_en,
          name: a.city_name_en,
        };
      });
    } else {
      newareas = areas.map(a => {
        return {
          id: a.city_name_ar,
          name: a.city_name_ar,
        };
      });
    }
    return newareas;
  }, [dir, areas]);
  const setAreaValue = val => {
    setFormValue({ ...formValue, area: val });
    setAreaFormValue({ ...areaFormValue, areaId: val });
  };
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex" justifyContent="space-between">
        <Div ml={3} mr={3}>
          <CRTextInput
            label={t('nameOrCode')}
            name="name"
            placeholder="Search"
            style={{ width: '200px' }}
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRTextInput
            label={t('phoneNo')}
            name="phoneNo"
            placeholder="Search"
            style={{ width: '200px' }}
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t('reference')}
            name="reference"
            data={options}
            onChange={val =>
              val == null ? setFormValue({ ...formValue, reference: '' }) : ''
            }
            style={{ width: '200px' }}
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t('area')}
            name="area"
            data={newAreas}
            value={formValue.area}
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
