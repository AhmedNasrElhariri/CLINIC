import React, { useState, useMemo } from 'react';
import { Nav, Form } from 'rsuite';
import { Link as ScrollLink, Element } from 'react-scroll';

import { Div } from 'components';

import { convertGroupFieldsToNavs } from 'services/appointment';
import InputField from './input-field';

const ScrollNavLink = ({ element, children, ...props }) => (
  <Nav.Item
    {...props}
    componentClass={ScrollLink}
    spy={true}
    smooth={true}
    duration={500}
    isDynamic={true}
    containerId="clinic-scroll-id"
  >
    {children}
  </Nav.Item>
);

function AppointmentData({ formValue, groups, onChange, disabled }) {
  const [activeSection, setActiveSection] = useState('');
  const navs = useMemo(() => convertGroupFieldsToNavs(groups), [groups]);

  return (
    <>
      <Div display="flex">
        <Div width={200}>
          <Nav vertical appearance="subtle">
            {convertGroupFieldsToNavs(groups).map((v, idx) => (
              <ScrollNavLink
                {...v}
                key={idx}
                onSetActive={setActiveSection}
                active={activeSection === v.to}
              >
                {v.title}
              </ScrollNavLink>
            ))}
          </Nav>
        </Div>
        <Div
          id="clinic-scroll-id"
          flexGrow={1}
          px={4}
          pb={6}
          height={600}
          overflow="scroll"
        >
          {Object.keys(formValue).length > 0 && (
            <Form formValue={formValue} onChange={onChange} fluid>
              {navs.map((v, idx) => (
                <Div
                  as={Element}
                  key={idx}
                  name={v.to}
                  pt={idx === 0 ? 0 : 4}
                  pb={4}
                >
                  <Div background="#f7f7fa" p={4} minHeight={400}>
                    <h3>{v.title}</h3>
                    {v.fields.map(f => (
                      <InputField key={f.id} {...f} disabled={disabled} />
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
