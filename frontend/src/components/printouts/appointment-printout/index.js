import React from 'react';
import { Form } from 'rsuite';
import * as R from 'ramda';

import { Div, CRTextArea, CRTextInput } from 'components';
import { ContainerStyled, PanelStyled } from './style';
import useGlobalState from 'state';
import { LONG_TEXT_FIELD_TYPE } from 'utils/constants';
import { H5 } from 'components/widgets';

const personalInfo = [
  { name: 'name', label: 'Name' },
  { name: 'age', label: 'Age' },
  { name: 'sex', label: 'Sex' },
];

const renderField = ({ type, name } = {}) => {
  return type === LONG_TEXT_FIELD_TYPE ? (
    <CRTextArea label={name} disabled />
  ) : (
    <CRTextInput label={name} disabled />
  );
};

const Print = ({ patient }) => {
  const views = useGlobalState('activeViews');

  if (R.isNil(views.fieldGroups)) {
    return null;
  }

  return (
    <ContainerStyled>
      <H5 mb={2}>Personal Info</H5>
      <PanelStyled bordered style={{ marginBottom: '2rem' }}>
        <Form>
          <Div display="flex">
            {personalInfo.map(({ name, label }, idx) => (
              <CRTextInput
                key={idx}
                label={label}
                value={patient[name]}
                disabled
              />
            ))}
          </Div>
        </Form>
      </PanelStyled>
      {views.fieldGroups.map(g => (
        <Div key={g.id}>
          <H5 mb={2}>{g.name}</H5>
          <PanelStyled bordered>
            <Form>
              {g.fields.map((field, idx) => (
                <Div key={field.id}>{renderField(field)}</Div>
              ))}
            </Form>
          </PanelStyled>
        </Div>
      ))}
    </ContainerStyled>
  );
};

Print.defaultProps = {};

class AppointmentTemplatePrintout extends React.Component {
  static defaultProps = {
    appointment: {},
    patient: {},
  };
  render() {
    return <Print {...this.props} />;
  }
}

export default AppointmentTemplatePrintout;
