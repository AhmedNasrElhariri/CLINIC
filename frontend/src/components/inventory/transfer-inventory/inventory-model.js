import { CRModal, Div } from 'components';
import { Steps } from 'rsuite';
import { useMemo } from 'react';
import TransferFrom from './transfer-from';
import TransferTo from './transfer-to';
const InventoryModel = ({
  show,
  t,
  handleCancel,
  handleOk,
  close,
  fromFormValue,
  fromSetFormValue,
  toFormValue,
  toSetFormValue,
  setActiveStep,
  activeStep,
}) => {
  const stepItems = useMemo(
    () =>
      [t('select'), t('transfer')].map((title, idx) => (
        <Steps.Item title={title} onClick={() => setActiveStep(idx)} />
      )),
    [setActiveStep, t]
  );
  const okTitle = useMemo(
    () => (activeStep === 0 ? 'Next' : 'Ok'),
    [activeStep]
  );
  return (
    <>
      <CRModal
        show={show}
        header={t('transferMedicineOrItem')}
        okTitle={okTitle}
        onOk={handleOk}
        onHide={() => {
          close();
          setActiveStep(0);
        }}
        onCancel={handleCancel}
        className="!w-[1024px]"
      >
        <div className="max-w-lg mx-auto mb-7">
          <Steps current={activeStep} className="![display:none] sm:!flex">
            {stepItems}
          </Steps>

          <Steps current={activeStep} vertical className="sm:hidden">
            {stepItems}
          </Steps>
        </div>

        <Div>
          {activeStep === 0 && (
            <Div>
              <TransferFrom
                t={t}
                formValue={fromFormValue}
                onChange={fromSetFormValue}
              />
            </Div>
          )}
          {activeStep === 1 && (
            <Div>
              <TransferTo
                formValue={toFormValue}
                onChange={toSetFormValue}
                fromFormValue={fromFormValue}
              />
            </Div>
          )}
        </Div>
      </CRModal>
    </>
  );
};
export default InventoryModel;
