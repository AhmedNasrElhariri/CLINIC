import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import { Element } from 'react-scroll';

import {
  Div,
  H3,
  CRNumberInput,
  CRTextInput,
  CRTextArea,
  CRRadio,
  CRCheckBoxGroup,
  CRButton,
  CRNestedSelector,
  CRMultipleSelector,
  CRSelectInput,
  Img,
} from 'components';


import { convertGroupFieldsToNavs } from 'services/appointment';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
  RADIO_FIELD_TYPE,
  CHECK_FIELD_TYPE,
  NESTED_SELECTOR_FIELD_TYPE,
  SELECTOR_WITH_INPUT,
} from 'utils/constants';

import AppointmentPictures from '../pictures';
import {
  useImageCategory,
  useLabCategory,
  useSessionDefinition,
  useLabDefinitions,
  useImageDefinition,
  useMedicineDefinitions,
} from 'hooks';
import AppointmentMedicines from './appointment-medecines';
import Labs from './appointment-labs';
import Images from './appointment-images';
import Pulses from './pulses';

const renderItem = ({
  type,
  choicesType,
  dynamic = false,
  id,
  name,
  choices = [],
  updatedSessions = [],
  ...props
}) => {
  let newChoices = [];
  if (type === 'SelectorWithInput') {
    if (dynamic) {
      newChoices = choices.map(c => {
        return { name: c, id: c };
      });
    } else {
      newChoices = updatedSessions;
    }
  }

  switch (type) {
    case NUMBER_FIELD_TYPE:
      return <CRNumberInput label={name} name={id} {...props} />;
    case TEXT_FIELD_TYPE:
      return <CRTextInput label={name} name={id} {...props} />;
    case LONG_TEXT_FIELD_TYPE:
      return <CRTextArea label={name} name={id} {...props} importable />;
    case RADIO_FIELD_TYPE:
      return (
        <CRRadio label={name} name={id} options={choices} {...props} inline />
      );
    case SELECTOR_WITH_INPUT:
      return (
        <CRMultipleSelector
          label={name}
          name={id}
          choices={newChoices}
          {...props}
        />
      );

    case CHECK_FIELD_TYPE:
      return (
        <CRCheckBoxGroup
          label={name}
          options={choices}
          name={id}
          {...props}
          inline
        />
      );
    case NESTED_SELECTOR_FIELD_TYPE:
      return (
        <CRNestedSelector label={name} name={id} choices={choices} {...props} />
      );
    default:
      return null;
  }
};

const SectionContainer = ({ title, children, name, ...props }) => {
  return (
    <Div as={Element} name={name} {...props}>
      <Div px={4} my={2}>
        <H3 mb={10}>{title}</H3>
        <Div mb={4}>{children}</Div>
      </Div>
    </Div>
  );
};

SectionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
const initalCategoryAndLab = {
  categoryId: null,
  labId: null,
};
const initalCategoryImage = {
  categoryId: null,
  imageId: null,
};
const initialSelectedMedicine = {
  medicineId: null,
};
function AppointmentData({
  formValue,
  groups,
  onChange,
  onDataChange,
  disabled,
  appointment,
  sessionsPulses,
  setSessionsPulses,
  sessionFormValue,
  appointmentFormValue,
  setSessionFormValue,
  handleShowPatientInfo,
}) {
  const navs = useMemo(() => convertGroupFieldsToNavs(groups), [groups]);
  const { labsCategory } = useLabCategory();
  const { imagesCategory } = useImageCategory();
  const { medicineDefinitions } = useMedicineDefinitions();
  const { sessionsDefinition } = useSessionDefinition();
  const [categoryLabForm, setCategoryLabForm] = useState(initalCategoryAndLab);
  const [categoryImageForm, setCategoryImageForm] =
    useState(initalCategoryImage);
  const [selectedMedicine, setSelectedMedicine] = useState(
    initialSelectedMedicine
  );
  const [session, SetSession] = useState({});
  const { patient } = appointment;
  const choices = useMemo(() => {
    return sessionsDefinition.map(s => ({
      name: s.name,
      id: { name: s.name, value: 0 },
    }));
  }, [sessionsDefinition]);
  const handlePicturesChange = useCallback(
    pictures => {
      onChange({
        ...appointmentFormValue,
        pictures,
      });
    },
    [appointmentFormValue, onChange]
  );
  const updatedSessions = useMemo(() => {
    return sessionsDefinition.map(s => {
      return { name: s.name, id: s.name };
    });
  }, [sessionsDefinition]);
  const handleMedicineChange = useCallback(
    prescription => {
      onChange({
        ...appointmentFormValue,
        prescription,
      });
    },
    [appointmentFormValue, onChange]
  );
  const categoryId = categoryLabForm?.categoryId;
  const { labsDefinition } = useLabDefinitions({ categoryId });
  const handleLabsChange = useCallback(
    labIds => {
      const cateLabs = labsDefinition.map(l => l.id);
      const appLabs = appointmentFormValue.labIds;
      const oldLabs = appLabs.filter(x => !cateLabs.includes(x));
      onChange({
        ...appointmentFormValue,
        labIds: [...oldLabs, ...labIds],
      });
    },
    [appointmentFormValue, onChange, categoryLabForm]
  );
  const imageId = categoryImageForm?.categoryId;
  const { imagesDefinition } = useImageDefinition({ categoryId: imageId });
  const handleImagesChange = useCallback(
    imageIds => {
      const cateImages = imagesDefinition.map(i => i.id);
      const appImages = appointmentFormValue.imageIds;
      const oldImages = appImages.filter(x => !cateImages.includes(x));
      onChange({
        ...appointmentFormValue,
        imageIds: [...oldImages, ...imageIds],
      });
    },
    [appointmentFormValue, onChange, categoryImageForm]
  );
  const handleAddSession = () => {
    setSessionsPulses([...sessionsPulses, session]);
  };
  const addLab = () => {
    const { labId } = categoryLabForm;
    if (labId) {
      const { labIds } = appointmentFormValue;
      onChange({
        ...appointmentFormValue,
        labIds: [...labIds, labId],
      });
    }
  };
  const addImage = () => {
    const { imageId } = categoryImageForm;
    if (imageId) {
      const { imageIds } = appointmentFormValue;
      onChange({
        ...appointmentFormValue,
        imageIds: [...imageIds, imageId],
      });
    }
  };
  const addMedicine = () => {
    const { medicineId } = selectedMedicine;
    if (medicineId) {
      const { selectedMedicines } = appointmentFormValue;
      onChange({
        ...appointmentFormValue,
        selectedMedicines: [...selectedMedicines, medicineId],
      });
    }
  };
  console.log(patient, 'PP');
  return (
    <>
      <Div display="flex">
        <Div flexGrow={1}>
          {Object.keys(formValue).length > 0 && (
            <>
              <Form formValue={formValue} onChange={onDataChange} fluid>
                {navs.map((v, idx) => (
                  <SectionContainer
                    key={idx}
                    title={v.title}
                    name={v.to}
                    pt={idx === 0 ? 0 : 4}
                  >
                    {v.fields.map(f => (
                      <Div mb={4} key={f.id}>
                        {renderItem({
                          ...f,
                          disabled,
                          updatedSessions,
                        })}
                      </Div>
                    ))}
                  </SectionContainer>
                ))}
              </Form>
            </>
          )}
          <SectionContainer title="Prescription" name="prescription">
            <Form formValue={selectedMedicine} onChange={setSelectedMedicine}>
              <Div
                mb={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CRSelectInput
                  name="medicineId"
                  data={medicineDefinitions}
                  label="Medicine"
                  style={{ width: '300px', marginRight: '20px' }}
                />
                <CRButton ml={20} mt={40} onClick={addMedicine}>
                  Add
                </CRButton>
              </Div>
            </Form>
            <AppointmentMedicines
              prescription={appointmentFormValue.prescription}
              medicineDefinitions={medicineDefinitions}
              selectedMedicines={appointmentFormValue.selectedMedicines}
              onChange={handleMedicineChange}
            />
          </SectionContainer>

          <SectionContainer title="Pulses" name="pulses">
            <Div
              display="flext"
              justifyContent="center"
              alignItems="center"
              mb={20}
            >
              <Form>
                <CRSelectInput
                  data={choices}
                  label="Session"
                  onChange={val => SetSession(val)}
                  style={{ width: '300px' }}
                />
              </Form>
              <CRButton
                primary
                onClick={() => handleAddSession()}
                ml={10}
                mt={40}
              >
                Add
              </CRButton>
            </Div>
            <Pulses
              pulses={appointmentFormValue}
              onChange={onChange}
              sessionsPulses={sessionsPulses}
              sessionFormValue={sessionFormValue}
              setSessionFormValue={setSessionFormValue}
            />
          </SectionContainer>
          <SectionContainer title="Labs" name="labs">
            <Form formValue={categoryLabForm} onChange={setCategoryLabForm}>
              <Div
                mb={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CRSelectInput
                  name="categoryId"
                  data={labsCategory}
                  label="Lab Category"
                  style={{ width: '300px', marginRight: '20px' }}
                />
                <CRSelectInput
                  name="labId"
                  data={labsDefinition}
                  label="Lab"
                  style={{ width: '300px' }}
                />
                <CRButton ml={20} mt={40} onClick={addLab}>
                  Add
                </CRButton>
              </Div>
            </Form>

            <Labs
              selectedLabs={appointmentFormValue.labIds}
              onChange={handleLabsChange}
              categoryId={categoryLabForm?.categoryId}
            />
          </SectionContainer>
          <SectionContainer title="Images" name="images">
            <Form formValue={categoryImageForm} onChange={setCategoryImageForm}>
              <Div
                mb={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CRSelectInput
                  name="categoryId"
                  block
                  data={imagesCategory}
                  label="Image Category"
                  style={{ width: '300px', marginRight: '10px' }}
                />
                <CRSelectInput
                  name="imageId"
                  data={imagesDefinition}
                  label="Image"
                  style={{ width: '300px' }}
                />
                <CRButton ml={20} mt={40} onClick={addImage}>
                  Add
                </CRButton>
              </Div>
            </Form>
            <Images
              selectedImages={appointmentFormValue.imageIds}
              onChange={handleImagesChange}
              categoryId={categoryImageForm?.categoryId}
            />
          </SectionContainer>

          <SectionContainer title="Notes" name="Notes">
            <Form formValue={appointmentFormValue} onChange={onChange}>
              <CRTextArea name="notes" disabled={disabled} importable />
            </Form>
          </SectionContainer>
          <SectionContainer title="Pictures" name="Pictures">
            <AppointmentPictures
              formValue={appointmentFormValue.pictures}
              onChange={handlePicturesChange}
            />
          </SectionContainer>
        </Div>
      </Div>
    </>
  );
}

export default AppointmentData;
