import { Div, CRLabel, CRButton } from 'components';
import { Fragment, useCallback } from 'react';
import { Form, InputNumber } from 'rsuite';
import { Spinner } from 'components/widgets/button/spinner';

const CostTab = ({
  onChange,
  selectedSessions,
  setSelectedSessions,
  handleFinish,
  loading,
  t
}) => {
  const handleChangeSesionCost = useCallback(
    (v, index) => {
      const session = selectedSessions[index];
      const newFormValue = selectedSessions.map((f, indx) =>
        index === indx ? { ...session, cost: Number(v) } : f
      );
      onChange(newFormValue);
      setSelectedSessions(newFormValue);
    },
    [selectedSessions]
  );
  return (
    <>
      <Form>
          {selectedSessions?.map((f, index) => (
            <Fragment>
              <CRLabel style={{ marginRight: '15px' }}>{f.name}</CRLabel>
              <InputNumber
                value={f?.cost}
                onChange={v => handleChangeSesionCost(v, index)}
                size="sm"
                style={{ marginRight: '20px' }}
              />
            </Fragment>
          ))}
        <Div mt="60px" ml="10px">
          <CRButton onClick={handleFinish}>
            {loading ? <Spinner /> : t('finish')}
          </CRButton>
        </Div>
      </Form>
    </>
  );
};
export default CostTab;
