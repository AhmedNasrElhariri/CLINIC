import React, { useMemo } from 'react';
import { Schema, Modal, Button } from 'rsuite';
import * as R from 'ramda';
import { ALL_AREAS } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import Form from './form';
import { usePatients, useForm } from 'hooks';
import { get } from 'services/local-storage';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/widgets/button/spinner';
import { CRButton } from 'components';
import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import { ACTIONS } from 'utils/constants';

const initialValues = {
  name: '',
  phoneNo: '',
  phoneNoTwo: '',
  area: '',
  code: '',
  ageOption: 'age',
  phoneOption: 'one',
  reference: [],
  age: 0,
  date: new Date(),
  type: 'Primary',
  guardianName: '',
  branchId: null,
  patientId: null,
  cardId: '',
  cardExpiryDate: null,
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .minLength(6, 'The field cannot be less than 6 characters')
    .maxLength(30, 'The field cannot be greater than 30 characters')
    .isRequired('User name is required'),
  phoneNo: StringType().isRequired('Phone No is  Required'),
  age: NumberType('Age should be a number').range(
    0,
    100,
    'Age should be 0-100 years old'
  ),
});
export default function NewPatient({
  show: showModel,
  onHide,
  onCreateDefault,
}) {
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue: initialValues,
      model,
    });
  const { data } = useQuery(ALL_AREAS);
  const { data: BranchesData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Patient },
  });
  const branches = useMemo(
    () => R.propOr([], 'listBranchesTree')(BranchesData),
    [data, BranchesData]
  );
  const { createPatient, createPatientLoading } = usePatients({
    onCreate: () => {
      onHide();
      setFormValue(initialValues);
      setShow(false);
    },
    onCreateDefault,
  });
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const { t, i18n } = useTranslation();
  const language = i18n?.language;
  const newAreas = useMemo(() => {
    let newareas = [];
    if (language === 'ar') {
      newareas = areas.map(a => {
        return {
          id: a.city_name_ar,
          name: a.city_name_ar,
        };
      });
    } else {
      newareas = areas.map(a => {
        return {
          id: a.city_name_en,
          name: a.city_name_en,
        };
      });
    }
    return newareas;
  }, [language, areas]);

  return (
    <Modal
      show={showModel}
      onHide={onHide}
      loading={createPatientLoading}
      className="!w-[calc(100vw-5%)] sm:!w-[40rem]"
    >
      <Modal.Header className="text-[1rem]">{t('newPatient')}</Modal.Header>
      <Modal.Body>
        <Form
          className="flex flex-col"
          onChange={setFormValue}
          formValue={formValue}
          newAreas={newAreas}
          checkResult={checkResult}
          show={show}
          branches={branches}
        />
      </Modal.Body>
      <Modal.Footer>
        <CRButton
          onClick={() => {
            setShow(true);
            if (validate) {
              const { ageOption, phoneOption, ...rest } = formValue;
              createPatient({
                variables: {
                  input: { ...rest },
                },
              });
            }
          }}
          appearance="primary"
          className="min-w-[5rem]"
        >
          {createPatientLoading ? <Spinner /> : t('ok')}
        </CRButton>
        <Button onClick={onHide} appearance="subtle">
          {t('cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
