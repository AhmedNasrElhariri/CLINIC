import React from 'react';
import { CRTextInput, Div } from 'components';
import { Form } from 'rsuite';

import { useTranslation } from 'react-i18next';

const PatientsFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();

  return (
    <Form
      // style={{ width: 276, marginBottom: 64, marginTop: '45px' }}
      className="my-10 flex flex-wrap gap-5"
      formValue={formValue}
      onChange={setFormValue}
    >
      {/* <Div display="flex" justifyContent="space-between"> */}
      {/* <Div ml={3} mr={3}> */}
      <CRTextInput
        label={t('nameOrCode')}
        name="name"
        placeholder="Search"
        style={{ width: '200px' }}
      />
      {/* </Div>
        <Div ml={3} mr={3}> */}
      <CRTextInput
        label={t('phoneNo')}
        name="phoneNo"
        placeholder="Search"
        style={{ width: '200px' }}
      />
      {/* </Div>
       </Div> */}
    </Form>
  );
};

export default PatientsFilter;
