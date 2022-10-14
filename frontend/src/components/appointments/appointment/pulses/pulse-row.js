import React from 'react';
import { FlexboxGrid, Form } from 'rsuite';

import {
  MedicineContainerStyled,
  BoxStyled,
} from './../appointment-medecines/style';
import { Div } from 'components';
import { CRNumberInput, CRSelectInput } from 'components/widgets';

const powerValues = [
  { name: '6', id: 6 },
  { name: '7', id: 7 },
  { name: '8', id: 8 },
  { name: '9', id: 9 },
  { name: '10', id: 10 },
  { name: '12', id: 12 },
  { name: '14', id: 14 },
  { name: '16', id: 16 },
];
const PulseRow = ({
  formValue,
  setFormValue,
  sessionsPulses,
  sessionFormValue,
  setSessionFormValue,
}) => {
  return (
    <>
      <MedicineContainerStyled>
        <Form
          fluid
          formValue={formValue}
          onChange={setFormValue}
          className="flex flex-wrap"
        >
          <BoxStyled className="w-52">
            <CRSelectInput
              placeholder="Power One"
              name="powerOne"
              data={powerValues}
              layout="inline"
              block
            />
          </BoxStyled>
          <BoxStyled className="w-52">
            <CRSelectInput
              placeholder="Power Two"
              name="powerTwo"
              data={powerValues}
              layout="inline"
              block
            />
          </BoxStyled>
          <BoxStyled className="w-52">
            <Div mr={2}>
              <CRNumberInput
                name="pulses"
                layout="inline"
                placeholder="Pulses"
              />
            </Div>
          </BoxStyled>
        </Form>
      </MedicineContainerStyled>
      {sessionsPulses?.length > 0 && (
        <MedicineContainerStyled>
          <Form
            formValue={sessionFormValue}
            onChange={setSessionFormValue}
            className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* <FlexboxGrid> */}
            {sessionsPulses?.map(sP => (
              // <FlexboxGrid.Item colspan={8} mt={2}>
              //   <BoxStyled>
              //     <Div mr={2}>

              <CRNumberInput
                formGroupClassName="flex-col text-center"
                name={sP.name}
                value={sessionFormValue.sP?.name}
                layout="inline"
                label={sP.name}
              />

              //     </Div>
              //   </BoxStyled>
              // </FlexboxGrid.Item>
            ))}
            {/* </FlexboxGrid> */}
          </Form>
        </MedicineContainerStyled>
      )}
    </>
  );
};

export default PulseRow;
