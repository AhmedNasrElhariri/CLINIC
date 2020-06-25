import React, { useState, useMemo } from 'react';
import { Form } from 'rsuite';
import { Element } from 'react-scroll';

import {
  Div,
  H3,
  CRNumberInput,
  CRTextInput,
  CRTextArea,
  CRNav,
} from 'components';

import { convertGroupFieldsToNavs } from 'services/appointment';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
} from 'utils/constants';

const ScrollNavLink = ({ element, children, ...props }) => {
  return (
    <CRNav.CRScoll {...props} containerId="clinic-scroll-id">
      {children}
    </CRNav.CRScoll>
  );
};

const renderItem = ({ type, id, name, ...props }) => {
  switch (type) {
    case NUMBER_FIELD_TYPE:
      return <CRNumberInput label={name} name={id} {...props} />;
    case TEXT_FIELD_TYPE:
      return <CRTextInput label={name} name={id} {...props} />;
    case LONG_TEXT_FIELD_TYPE:
      return <CRTextArea label={name} name={id} {...props} />;
    default:
      return null;
  }
};

function AppointmentData({ formValue, groups, onChange, disabled }) {
  const [activeSection, setActiveSection] = useState('');
  const navs = useMemo(() => convertGroupFieldsToNavs(groups), [groups]);

  return (
    <>
      <Div display="flex">
        <Div width={300}>
          <CRNav vertical onSelect={setActiveSection}>
            {convertGroupFieldsToNavs(groups).map((v, idx) => (
              <ScrollNavLink
                eventKey={v.to}
                {...v}
                key={idx}
                active={activeSection === v.to}
              >
                {v.title}
              </ScrollNavLink>
            ))}
          </CRNav>
        </Div>
        <Div
          id="clinic-scroll-id"
          flexGrow={1}
          px={4}
          pb={6}
          height="100vh"
          maxHeight="100vh"
          overflow="scroll"
        >
          {Object.keys(formValue).length > 0 && (
            <Form formValue={formValue} onChange={onChange} fluid>
              {navs.map((v, idx) => (
                <Div as={Element} key={idx} name={v.to} pt={idx === 0 ? 0 : 4}>
                  <Div p={4} minHeight={400}>
                    <H3 mb={43}>{v.title}</H3>
                    {v.fields.map(f => (
                      <Div mb={4} key={f.id}>
                        {renderItem({ ...f, disabled })}
                      </Div>
                    ))}
                  </Div>
                </Div>
              ))}
            </Form>
          )}
        </Div>
      </Div>
    </>
  );
}

export default AppointmentData;
