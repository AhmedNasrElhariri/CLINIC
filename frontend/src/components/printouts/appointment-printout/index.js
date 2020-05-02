import React from 'react';
import { Form, Input, ControlLabel, FormGroup } from 'rsuite';

import { Div } from 'components';
import { ContainerStyled, PanelStyled } from './style';

const personalInfo = [
  { name: 'name', label: 'Name' },
  { name: 'age', label: 'Age' },
  { name: 'sex', label: 'Sex' },
];

const vitalDataList = [
  { name: 'weight', label: 'Weight' },
  { name: 'height', label: 'Height' },
  { name: 'pulse', label: 'Pulse' },
  { name: 'temp', label: 'Temp' },
  { name: 'glucoseLevel', label: 'Glucose Level' },
];

const mainFields = [
  { value: '', label: 'complain' },
  { value: '', label: 'signs' },
  { value: '', label: 'labs' },
  { value: '', label: 'diagnosis' },
  { value: '', label: 'treatment' },
  { value: '', label: 'recommendations' },
];

class Print extends React.Component {
  render() {
    return (
      <ContainerStyled>
        <h4>Personal Info</h4>
        <PanelStyled bordered style={{ marginBottom: '2rem' }}>
          <Form>
            <Div display="flex">
              {personalInfo.map(({ name, label }, idx) => (
                <Div flexGrow={1} px={2} key={idx}>
                  <FormGroup>
                    <ControlLabel>{label}</ControlLabel>
                    <Input disabled={true} value={this.props[name]} />
                  </FormGroup>
                </Div>
              ))}
            </Div>
          </Form>
        </PanelStyled>

        <h4>Vital Data</h4>
        <PanelStyled bordered style={{ marginBottom: '2rem' }}>
          <Form>
            <Div display="flex">
              {vitalDataList.map(({ name, label }, idx) => (
                <Div flexGrow={1} px={2} key={idx}>
                  <FormGroup>
                    <ControlLabel>{label}</ControlLabel>
                    <Input disabled={true} />
                  </FormGroup>
                </Div>
              ))}
            </Div>
          </Form>
        </PanelStyled>

        <h4>Diagnosis & Treatment</h4>
        <PanelStyled bordered>
          <Form>
            {mainFields.map(({ label }, idx) => (
              <FormGroup key={idx}>
                <ControlLabel>{label}</ControlLabel>
                <Input componentClass="textarea" rows={3} disabled={true} />
              </FormGroup>
            ))}
          </Form>
        </PanelStyled>
      </ContainerStyled>
    );
  }
}

export default Print;
