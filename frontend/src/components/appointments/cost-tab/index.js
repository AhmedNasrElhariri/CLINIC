import { Div, CRLabel } from 'components';
import { Fragment, useCallback } from 'react';
import { Form, InputNumber } from 'rsuite';

const CostTab = ({ onChange, selectedSessions, setSelectedSessions }) => {
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
        <Div display="flex">
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
        </Div>
      </Form>
    </>
  );
};
export default CostTab;
