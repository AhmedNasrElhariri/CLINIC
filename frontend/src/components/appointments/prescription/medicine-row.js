import React, { useCallback, useState } from 'react';
import {
  FlexboxGrid,
  Form,
  FormControl,
  InputNumber,
  InputPicker,
} from 'rsuite';

import { MedicineContainerStyled, BoxStyled, NumberBox } from './style';
import { CRButton, Div, H6, H7 } from 'components';

const MedicineRow = ({
  medicineName,
  concentration,
  medicineForm,
  timings,
  medicineValue,
  onChange: setFormValue2,
}) => {
  const initialValue = {
    dose: '',
    medicine: medicineName,
    timing: '',
    numDuration: '',
    periodDuration: '',
  };
  const [formValue, setFormValue] = useState(initialValue);
  const [prescribe, setPrescribe] = useState('Prescribe');
  const [color, setColor] = useState('primary');
  const handleClicked = useCallback(() => {
    const newMedicine = [...medicineValue, formValue];
    setFormValue2(newMedicine);
    setFormValue(initialValue);
    // setPrescribe('Prescribed');
    setColor('success');
    setPrescribe('Prescribed');
  }, [formValue, initialValue, medicineValue, setFormValue2]);
  return (
    <MedicineContainerStyled>
      <Form fluid formValue={formValue} onChange={setFormValue}>
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
                name="dose"
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
                name="timing"
                style={{ margin: 0 }}
                accepter={InputPicker}
                data={timings}
                block
              />
            </BoxStyled>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <BoxStyled>
              <NumberBox>
                <FormControl
                  placeholder="Number"
                  name="numDuration"
                  style={{ marginRight: '2px' }}
                  accepter={InputNumber}
                  block
                />
              </NumberBox>
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
              <CRButton
                variant={color}
                small
                m="auto"
                onClick={handleClicked}
                style={{ padding: '10px' }}
              >
                {prescribe}
              </CRButton>
            </Div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </MedicineContainerStyled>
  );
};

export default MedicineRow;
