import React from 'react';
import {
  FlexboxGrid,
  Form,
  FormControl,
  InputNumber,
  InputPicker,
} from 'rsuite';

import { MedicineContainerStyled, BoxStyled, NumberBox } from './style';
import { CRButton, Div, H6, H7 } from 'components';

const peridos = [
  { label: 'Year', value: 'year', arbiceValue: 'سنة', englishValue: 'year' },
  { label: 'Month', value: 'month', arbiceValue: 'شهر', englishValue: 'month' },
  { label: 'Week', value: 'week', arbiceValue: 'أسبوع', englishValue: 'week' },
  { label: 'Day', value: 'day', arbiceValue: 'يوم', englishValue: 'day' },
];

const MedicineRow = ({ timings, medicine, formValue, onChange, onClick }) => {
  const { name, concentration, form } = medicine;
  const required = formValue.required;

  return (
    <MedicineContainerStyled>
      <Form fluid formValue={formValue} onChange={onChange}>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={5}>
            <Div display="flex" alignItems="center" height={55}>
              <H6 fontWeight="bold">{name}</H6>
              <H6 mx={1}>({form})</H6>
              <H7 fontStyle="italic">{concentration}</H7>
            </Div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>
            <BoxStyled>
              <FormControl
                name="dose"
                placeholder="Dose"
                style={{ margin: 0 }}
                accepter={InputNumber}
                disabled={required}
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <BoxStyled>
              <FormControl
                placeholder="Timing"
                name="timingId"
                style={{ margin: 0 }}
                accepter={InputPicker}
                data={timings}
                valueKey="id"
                labelKey="name"
                disabled={required}
                block
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <BoxStyled>
              <NumberBox>
                <FormControl
                  placeholder="Duration"
                  name="duration"
                  style={{ marginRight: '2px' }}
                  accepter={InputNumber}
                  disabled={required}
                  block
                />
              </NumberBox>
              <FormControl
                placeholder="Period"
                accepter={InputPicker}
                disabled={required}
                data={peridos}
                block
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Div
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={'3px'}
            >
              <CRButton
                height={50}
                width={100}
                variant={required ? 'dark' : 'primary'}
                small
                p={10}
                onClick={onClick}
              >
                {required ? 'Required' : 'Require'}
              </CRButton>
            </Div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
