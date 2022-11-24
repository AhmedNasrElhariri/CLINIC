import React, { useCallback, useContext, useMemo } from 'react';
import { ACTIONS } from 'utils/constants';
import {
  CRModal,
  CRButton,
  CRTextInput,
  CRBrancheTree,
  CRSelectInput,
  Div,
  H3,
} from 'components';
import { FlexboxGrid, List, Form, Icon } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { CRDivider, H4, H5, H6 } from 'components/widgets';
import { ThemeContext } from 'styled-components';

export const formOptions = [
  'AMP',
  'Capsules',
  'Clean',
  'Cream',
  'Drops',
  'Gel',
  'Lotion',
  'Mask',
  'Ointment',
  'Powder',
  'Sachets',
  'Serum',
  'Spray',
  'Suppository',
  'Syrup',
  'Tablets',
  'Vial',
].map(val => ({ id: val, name: val }));

export const concentrationOptions = [
  '1 mg',
  '5 mg',
  '10 mg',
  '100 mg',
  '500 mg',
  '1000 mg',
].map(val => ({ id: val, name: val }));

function NewMedicine({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  checkResult,
  validate,
  show,
  setShow,
  onAddDose,
  onDeleteDose,
}) {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);

  const header = useMemo(
    () =>
      type === 'create'
        ? t('addNewMedicine')
        : type === 'edit'
        ? t('editMedicine')
        : 'Delete Medicine',
    [type]
  );

  const changeProp = useCallback(
    (index, prop, val) => {
      const newVal = {
        ...formValue,
        doses: formValue.doses.map((dose, idx) =>
          idx === index ? { ...dose, [prop]: val } : dose
        ),
      };
      onChange(newVal);
    },
    [formValue, onChange]
  );

  return visible ? (
    <CRModal
      show={visible}
      header={header}
      onOk={() => {
        setShow(true);
        validate && onOk();
      }}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        {type === 'delete' ? (
          <Div>
            <H3>Are you sure that you want to delete the Medicine ? </H3>
          </Div>
        ) : (
          <>
            <CRTextInput
              label={t('name')}
              name="name"
              errorMessage={
                show && checkResult['name'].hasError
                  ? checkResult['name'].errorMessage
                  : ''
              }
              placeholder="Type Name"
              block
            />

            <CRDivider />
            <Div>
              <H5 fontWeight="normal">Form - Concentration Combinations</H5>
            </Div>
            <Div>
              <Icon icon="expand-o" onClick={onAddDose} size="lg" />
              <Div>
                {formValue.doses.map((item, index) => (
                  <Div key={index} index={index}>
                    <Div width="100%">
                      <FlexboxGrid>
                        <FlexboxGrid.Item colspan={11}>
                          <Div p={2}>
                            <CRSelectInput
                              value={item.form}
                              label={t('medicineForm')}
                              data={formOptions}
                              style={{ width: '100%' }}
                              onChange={value =>
                                changeProp(index, 'form', value)
                              }
                            />
                          </Div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11}>
                          <Div p={2}>
                            <CRSelectInput
                              value={item.concentration}
                              label={t('concentration')}
                              data={concentrationOptions}
                              style={{ width: '100%' }}
                              onChange={value =>
                                changeProp(index, 'concentration', value)
                              }
                            />
                          </Div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item
                          colspan={2}
                          style={{ alignSelf: 'end' }}
                        >
                          <Div p={2}>
                            <Icon
                              icon="data-decrease"
                              onClick={() => onDeleteDose(index)}
                              size="lg"
                              style={{ color: themeContext.colors.danger }}
                            />
                          </Div>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </Div>
                  </Div>
                ))}
              </Div>
            </Div>
            <CRDivider />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.View_Medicine}
            />
          </>
        )}
      </Form>
    </CRModal>
  ) : null;
}

NewMedicine.defaultProps = {
  type: 'create',
};

export default NewMedicine;
