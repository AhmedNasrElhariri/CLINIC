import React, { useState, useEffect } from 'react';
import { Nav, Form, FormControl } from 'rsuite';
import { Link as ScrollLink, Element } from 'react-scroll';

import { Div } from 'components';
// import navs from './navs.metadata';

import {
  getFormInitValue,
  convertGroupFieldsToNavs,
  getFormInitValues,
} from 'services/appointment';
import InputField from './input-field';

const initForm = () => {};

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

function AppointmentInput({ disabled, groups }) {
  const [activeSection, setActiveSection] = useState('');
  const navs = convertGroupFieldsToNavs(groups);
  console.log(getFormInitValues(groups));
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    setFormValue(getFormInitValues(groups));
  }, [groups]);

  return (
    <>
      <Div display="flex">
        <Div width={150}>
          <Nav vertical appearance="subtle" >
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
          <Form formValue={formValue} onChange={setFormValue} fluid>
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
                    <InputField key={f.id} {...f} />
                  ))}
                </Div>
              </Div>
            ))}
          </Form>
        </Div>
      </Div>
    </>
  );
}

export default AppointmentInput;
