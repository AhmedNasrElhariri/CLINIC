import React, { useCallback, useState } from 'react';
import { Panel, Form, Input, SelectPicker, Icon } from 'rsuite';
import { InputField, Div, H6 } from 'components';
import useGlobalState from 'state';
import { FIELD_TYPES } from 'utils/constants';
import NewValues from './new-values';
import TreeValues from './tree-values';
import useFrom from 'hooks/form';
import useModal from 'hooks/use-model';

const Card = ({ laneId, index }) => {
  const [lanes, setLanes] = useGlobalState('lanes');

  const lane = lanes.find(l => l.id === laneId);
  const [popup, setPopup] = useState(0);

  const cards = lane.cards;
  const formValue = cards[index];
  const { visible, open, close } = useModal();
  const { type, setType } = useFrom({});
  const update = useCallback(
    data => {
      const newLanes = lanes.map(l => ({
        ...l,
        cards: l.cards.map(c => (c.id === data.id ? data : c)),
      }));
      setLanes(newLanes);
    },
    [lanes, setLanes]
  );

  const remove = useCallback(() => {
    const newLanes = lanes.map(l => ({
      ...l,
      cards: l.cards.filter(c => c.id !== formValue.id),
    }));
    setLanes(newLanes);
  }, [formValue, lanes, setLanes]);
  const handleClickCreate = useCallback(() => {
    setType('create');
    setPopup(1);
    open();
  }, [open, setType]);

  const handleClickCreateTree = useCallback(() => {
    setType('create');
    setPopup(2);
    open();
  }, [open, setType]);
  const handleAdd = () => {};
  return (
    <>
      <Panel
        bordered
        style={{ background: '#ffffff', marginBottom: 10, cursor: 'pointer' }}
      >
        <Div>
          <Form fluid onChange={update} formValue={formValue}>
            <InputField
              size="xs"
              label="Name"
              name="name"
              accepter={Input}
              placeholder="Name"
            />
            <InputField
              size="xs"
              label="Type"
              name="type"
              accepter={SelectPicker}
              cleanable={false}
              searchable={false}
              placeholder="Select type"
              data={FIELD_TYPES}
            />
          </Form>
          {formValue.type === 'Radio' ||
          formValue.type === 'Check' ||
          formValue.type === 'Tree' ? (
            <H6
              primary
              small
              onClick={
                formValue.type === 'Tree'
                  ? handleClickCreateTree
                  : handleClickCreate
              }
              style={{
                fontSize: '10px',
                color: 'blue',
                display: 'block',
                float: 'left',
              }}
            >
              Add New Values +
            </H6>
          ) : (
            <></>
          )}
        </Div>
        <Icon
          icon="trash"
          onClick={remove}
          style={{
            color: '#f44336',
            float: 'right',
            marginTop: 2,
          }}
        />

        {popup === 1 && (
          <NewValues
            visible={visible}
            onOk={handleAdd}
            onClose={close}
            type={type}
          />
        )}
        {popup === 2 && (
          <TreeValues
            visible={visible}
            onOk={handleAdd}
            onClose={close}
            type={type}
          />
        )}
      </Panel>
    </>
  );
};

export default Card;
