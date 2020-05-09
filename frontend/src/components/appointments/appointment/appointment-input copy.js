import React, { useState } from 'react';
import { Nav, Form, FormControl } from 'rsuite';
import { Link as ScrollLink, Element } from 'react-scroll';

import { Div } from 'components';
import navs from './navs.metadata';

import { convertGroupFieldsToNavs } from 'services/appointment';

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

function AppointmentInput({
  disabled,
  formValue,
  onChange: setFormValue,
  groups,
}) {
  const [activeSection, setActiveSection] = useState(navs[0].to);

  console.log(convertGroupFieldsToNavs(groups));

  return (
    <>
      <Div display="flex">
        <Div width={150}>
          <Nav vertical appearance="tabs">
            {navs.concat(convertGroupFieldsToNavs(groups)).map((v, idx) => (
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
          <Form onChange={setFormValue} formValue={formValue}>
            {navs.map((v, idx) => (
              <Div
                as={Element}
                key={idx}
                name={v.to}
                pt={idx === 0 ? 0 : 5}
                pb={5}
              >
                <Div background="#f7f7fa" p={4} minHeight={400}>
                  <h3>{v.title}</h3>
                  <FormControl
                    {...v}
                    disabled={disabled}
                    accepter={v.element}
                    style={{ width: '100%' }}
                  ></FormControl>
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
