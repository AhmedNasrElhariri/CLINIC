import { CRModal, Div, H3 } from 'components';
import { CRButton, CRTextInput } from 'components/widgets';
import { Form } from 'rsuite';

const BusinessNotes = ({ show, onCancel, onOk, notes, setNotes, t, type }) => {
  return (
    <CRModal
      show={show}
      header={type === 'add' ? t('addNotes') : t('deleteNotes')}
      onOk={onOk}
      onHide={onCancel}
      onCancel={onCancel}
      noFooter={type === 'delete' ? false : true}
      noHeader
    >
      {type === 'add' ? (
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
      ) : (
        <Div>
          <H3>
            Are you sure that you want to delete this note - (
            {notes?.businessNotes})
          </H3>
        </Div>
      )}
    </CRModal>
  );
};

export default BusinessNotes;
