import { useMemo } from 'react';
import { Form } from 'rsuite';
import { CRRadio, CRModal, H3, CRNumberInput, CRSelectInput } from 'components';
import { feesCalTypes } from 'utils/constants';

export default function NewPart({
  show,
  onCancel,
  onOk,
  formValue,
  onChange,
  type,
  courseParts,
  users,
  t,
}) {
  const header = useMemo(() => {
    if (type === 'newCoursePart') {
      return t('newCoursePart');
    } else {
      return t('deleteCoursePart');
    }
  }, [type, t]);
  return (
    <CRModal
      show={show}
      header={header}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onOk(formValue)}
    >
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'delete' ? (
          <H3>Are you sure that you want to delete this record ?</H3>
        ) : (
          <>
            <CRSelectInput
              name="doctorId"
              label={t('doctor')}
              labelKey="name"
              valueKey="id"
              block
              data={users}
            />
            <CRSelectInput
              name="partId"
              label={t('part')}
              labelKey="name"
              valueKey="id"
              block
              data={courseParts}
            />
            <CRRadio
              options={feesCalTypes}
              name="feesCalculationType"
              label={t('feesCalculationType')}
            />
            <CRNumberInput name="fees" label={t('fees')} block float />
          </>
        )}
      </Form>
    </CRModal>
  );
}

NewPart.propTypes = {};
