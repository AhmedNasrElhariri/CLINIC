import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
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
import { isSession } from 'services/appointment';
import { convertGroupFieldsToNavs } from 'services/appointment';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
  Labs
} from 'utils/constants';

import AppointmentImages from '../images';

import { HomeSidebarStyled } from './style';
import ListLabs from './list-labs';

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
      return <CRTextArea label={name} name={id} {...props} importable />;
    default:
      return null;
  }
};

const SectionContainer = ({ title, children, name, ...props }) => {
  return (
    <Div as={Element} name={name} {...props}>
      <Div p={4} minHeight={400}>
        <H3 mb={43}>{title}</H3>
        <Div mb={4}>{children}</Div>
      </Div>
    </Div>
  );
};

SectionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function AppointmentData({
  formValue,
  groups,
  onChange,
  disabled,
  appointment,
  appointmentFormValue,
  onChangeAppointment,
}) {
  const [activeSection, setActiveSection] = useState('');
  const navs = useMemo(() => convertGroupFieldsToNavs(groups), [groups]);

  const handleCollectionsChange = useCallback(
    collections => {
      onChangeAppointment({
        ...appointmentFormValue,
        collections,
      });
    },
    [appointmentFormValue, onChangeAppointment]
  );

  return (
    <>
      <Div display="flex">
        {!isSession(appointment) && (
          <HomeSidebarStyled>
            <CRNav vertical onSelect={setActiveSection}>
              {navs.map((v, idx) => (
                <ScrollNavLink
                  eventKey={v.to}
                  {...v}
                  key={idx}
                  active={activeSection === v.to}
                >
                  {v.title}
                </ScrollNavLink>
              ))}
              <ScrollNavLink
                eventKey="Notes"
                active={activeSection === 'Notes'}
                to="Notes"
              >
                Notes
              </ScrollNavLink>
              <ScrollNavLink
                eventKey="Images"
                active={activeSection === 'Images'}
                to="Images"
              >
                Images
              </ScrollNavLink>
              <ScrollNavLink
                eventKey="Prescription"
                active={activeSection === 'Prescription'}
                to="Prescription"
              >
                Prescription
              </ScrollNavLink>
            </CRNav>
          </HomeSidebarStyled>
        )}
        <Div id="clinic-scroll-id" flexGrow={1}>
          {!isSession(appointment) && Object.keys(formValue).length > 0 && (
            <>
              <Form formValue={formValue} onChange={onChange} fluid>
                {navs.map((v, idx) => (
                  <SectionContainer
                    key={idx}
                    title={v.title}
                    name={v.to}
                    pt={idx === 0 ? 0 : 4}
                  >
                    {v.fields.map(f => (
                      <Div mb={4} key={f.id}>
                        {renderItem({ ...f, disabled })}
                      </Div>
                    ))}
                  </SectionContainer>
                ))}
              </Form>
            </>
          )}
          <SectionContainer title="Notes" name="Notes">
            <Form
              formValue={appointmentFormValue}
              onChange={onChangeAppointment}
            >
              <CRTextArea name="notes" disabled={disabled} />
            </Form>
          </SectionContainer>
          <SectionContainer title="Images" name="Images">
            <AppointmentImages
              formValue={appointmentFormValue.collections}
              onChange={handleCollectionsChange}
            />
          </SectionContainer>
          <SectionContainer title="Lab" name="Lab">
            <Form
              formValue={appointmentFormValue}
              onChange={onChangeAppointment}
            >
              {/* <CRTextArea name="prescription" disabled={disabled} /> */}
              <ListLabs data={Labs}/>
            </Form>

          </SectionContainer>
          <SectionContainer title="Images" name="Images">
            <Form
              formValue={appointmentFormValue}
              onChange={onChangeAppointment}
            >
              {/* <CRTextArea name="prescription" disabled={disabled} /> */}
              <ListLabs data={Labs}/>
            </Form>

          </SectionContainer>
        </Div>
      </Div>
    </>
  );
}

export default AppointmentData;
