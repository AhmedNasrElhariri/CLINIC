import React from 'react';
import { FlexboxGrid, Form } from 'rsuite';

import { MedicineContainerStyled, BoxStyled } from './style';
import { CRButton, Div, H6, H7 } from 'components';
import { CRNumberInput, CRSelectInput, CRTextInput } from 'components/widgets';

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
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item colspan={5}>
            <Div display="flex" alignItems="center">
              <H6 fontWeight="bold">{name}</H6>
              <H6 mx={1}>({form})</H6>
              <H7 fontStyle="italic">{concentration}</H7>
            </Div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>
            <BoxStyled>
              <CRTextInput
                name="dose"
                layout="inline"
                placeholder="Dose"
                disabled={required}
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>
            <BoxStyled>
              <CRSelectInput
                placeholder="Timing"
                name="timingId"
                data={timings}
                disabled={required}
                layout="inline"
                block
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <BoxStyled>
              <Div mr={2}>
                <CRNumberInput
                  name="duration"
                  layout="inline"
                  placeholder="Duration"
                  disabled={required}
                />
              </Div>
              <CRSelectInput
                placeholder="Period"
                name="period"
                data={peridos}
                disabled={required}
                layout="inline"
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
