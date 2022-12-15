import React from 'react';
import { CRDateRangePicker, Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';

const Filter = ({ formValue, setFormValue, t, users, models, tagNames }) => {
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex" flexWrap="wrap">
        <CRSelectInput
          label={t('user')}
          name="userId"
          placeholder={t('select')}
          block
          data={users}
          style={{ marginRight: '30px', width: '150px' }}
        />
        <CRDateRangePicker
          name="date"
          label="From - To"
          placeholder={t('timeframe')}
          size="sm"
          block
          small
          placement="auto"
          style={{ marginRight: '30px', width: '200px' }}
        />
        <CRSelectInput
          label={t('model')}
          name="model"
          placeholder={t('select')}
          block
          data={models}
          style={{ marginRight: '30px', width: '150px' }}
        />
        <CRSelectInput
          label={t('tagName')}
          name="tag"
          placeholder={t('select')}
          valueKey="name"
          labelKey="name"
          block
          data={tagNames}
          style={{ marginRight: '30px', width: '150px' }}
        />
      </Div>
    </Form>
  );
};

export default Filter;
