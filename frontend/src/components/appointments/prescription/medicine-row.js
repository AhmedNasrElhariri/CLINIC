import React from 'react';
import {
  FlexboxGrid,
  Form,
  FormGroup,
  FormControl,
  InputNumber,
  InputPicker,
} from 'rsuite';

import { MedicineContainerStyled, BoxStyled } from './style';
import { CRButton, Div, H6, H7 } from 'components';

// 'rgb(81 198 243)'
const MedicineRow = ({
  medicineName,
  concentration,
  medicineForm,
  timings,
}) => {
  
  return (
    <MedicineContainerStyled>
      <Form fluid>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={6}>
            <Div display="flex" alignItems="center" height={55}>
              <H6 fontWeight="bold">{medicineName}</H6>
              <H6 mx={1}>({medicineForm})</H6>
              <H7 fontStyle="italic">{concentration}</H7>
            </Div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <BoxStyled>
              <FormControl
                name="name"
                placeholder="Dose"
                style={{ margin: 0 }}
                accepter={InputNumber}
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <BoxStyled>
              <FormControl
                placeholder="Timing"
                name="name"
                style={{ margin: 0 }}
                accepter={InputPicker}
                data={timings}
                block
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <BoxStyled>
              <FormControl
                placeholder="Number"
                name="name"
                style={{ marginRight: '2px' }}
                accepter={InputNumber}
                block
              />
              <FormControl
                placeholder="Duration"
                name="periodDuration"
                style={{ marginLeft: '2px' }}
                accepter={InputPicker}
                block
                data={[
                  { label: 'Year', value: 'year' },
                  { label: 'Month', value: 'month' },
                  { label: 'Week', value: 'week' },
                  { label: 'Day', value: 'day' },
                ]}
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Div
              height={55}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CRButton primary small m="auto" style={{ padding: '10px' }}>
                Prescribe
              </CRButton>
            </Div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
