import React, { useCallback, useState, useMemo } from 'react';
import { Panel, Form, Input, SelectPicker, Icon } from 'rsuite';
import { InputField, Div, H6 } from 'components';
import useGlobalState from 'state';
import {
  FIELD_TYPES,
  RADIO_FIELD_TYPE,
  CHECK_FIELD_TYPE,
  NESTED_SELECTOR_FIELD_TYPE,
  SELECTOR_WITH_INPUT,
} from 'utils/constants';
import Choices from './choices';
import NestedChoices from './nested-choices';
import { useModal } from 'hooks';
const choicesTypes = [{ name: 'Sessions-Definition', id: 'sessions' }];
const initialChoicesType = { choicesType: 'sessions' };
const Card = ({ laneId, index }) => {
  const [lanes, setLanes] = useGlobalState('lanes');
  const [editLane, setEditLane] = useGlobalState('editLane');
  const lane = lanes?.find(l => l.id === laneId);
  const [popup, setPopup] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [choicesType, setChoicesType] = useState(initialChoicesType);
  console.log(choicesType, 'choicesTypechoicesType');
  const cards = lane?.cards;

  const formValue = cards[index];
  const { visible, open, close } = useModal();

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
    setPopup(1);
    open();
  }, [open]);

  const handleClickCreateTree = useCallback(() => {
    setPopup(2);
    open();
  }, [open]);

  const handleSetChoices = choices => {
    update({
      ...formValue,
      choices,
      dynamic: toggle,
      choicesType: choicesType.choicesType,
    });
    close();
  };

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const fieldType = useMemo(() => formValue.type, [formValue.type]);
  const hasChoices = useMemo(() => {
    return [
      RADIO_FIELD_TYPE,
      CHECK_FIELD_TYPE,
      NESTED_SELECTOR_FIELD_TYPE,
      SELECTOR_WITH_INPUT,
    ].includes(fieldType);
  }, [fieldType]);

  return (
    <>
      <Panel
        bordered
        style={{ background: '#ffffff', marginBottom: 10, cursor: 'pointer' }}
      >
        <Div>
          <Form fluid onChange={update} formValue={formValue}>
            <InputField
              label="Name"
              name="name"
              accepter={Input}
              placeholder="Name"
            />
            <InputField
              label="Type"
              name="type"
              placeholder="Select type"
              accepter={SelectPicker}
              searchable={false}
              data={FIELD_TYPES}
            />
          </Form>
          {hasChoices && (
            <H6
              variant="primary"
              onClick={
                fieldType === NESTED_SELECTOR_FIELD_TYPE
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
              Choices +
            </H6>
          )}
        </Div>
        {!editLane && (
          <Icon
            icon="trash"
            onClick={remove}
            style={{
              color: '#f44336',
              float: 'right',
              marginTop: 2,
            }}
          />
        )}

        {popup === 1 && (
          <Choices
            visible={visible}
            onOk={handleSetChoices}
            onClose={handleClose}
            toggle={toggle}
            setToggle={setToggle}
            choicesTypes={choicesTypes}
            choicesType={choicesType}
            setChoicesType={setChoicesType}
          />
        )}
        {popup === 2 && (
          <NestedChoices
            visible={visible}
            onOk={handleSetChoices}
            onClose={handleClose}
          />
        )}
      </Panel>
    </>
  );
};

export default Card;
