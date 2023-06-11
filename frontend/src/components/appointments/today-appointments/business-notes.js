import { CRModal, Div } from 'components';
import { CRButton, CRTextInput } from 'components/widgets';
import { Form } from 'rsuite';
import * as R from 'ramda';
import { LI, UL, DIV } from './style';

const BusinessNotes = ({
  appointment,
  show,
  onCancel,
  onOk,
  notes,
  setNotes,
  t,
}) => {
  const patientNotes = R.propOr([], 'patientNotes')(appointment);
  return (
    <CRModal
      show={show}
      header={t('addNotes')}
      onOk={onOk}
      onHide={onCancel}
      onCancel={onCancel}
      noFooter
      noHeader
    >
      {patientNotes.map(({ text }, index) => (
        <DIV>
          <Div p="5px 10px">{index + 1}</Div>
          <UL>
            <LI key={index}>
              <span>{text}</span>
            </LI>
          </UL>
        </DIV>
      ))}
      <Div display="flex" justifyContent="space-between" m="0px 20px">
        <Form formValue={notes} onChange={setNotes}>
          <CRTextInput width="400px" name="businessNotes" />
        </Form>
        {notes?.businessNotes.length > 0 && (
          <CRButton mt="10px" onClick={onOk}>
            Add
          </CRButton>
        )}
      </Div>
    </CRModal>
  );
};

export default BusinessNotes;
