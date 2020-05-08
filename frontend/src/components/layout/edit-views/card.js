import React from 'react';
import { Panel, Form, Input, SelectPicker, RadioGroup, Radio } from 'rsuite';
import { InputField } from 'components';
import useGlobalState from 'state';

const fieldTypes = [
  { label: 'Number', value: 'number' },
  { label: 'Text', value: 'text' },
  { label: 'Text Area', value: 'textArea' },
];

const Card = ({ laneId, index }) => {
  const [lanes, setLanes] = useGlobalState('lanes');

  const lane = lanes.find(l => l.id === laneId);
  const cards = lane.cards;
  const formValue = cards[index];

  const update = data => {
    const newLanes = lanes.map(l => ({
      ...l,
      cards: l.cards.map(c => (c.id === data.id ? data : c)),
    }));
    setLanes(newLanes);
  };
  return (
    <Panel
      bordered
      style={{ background: '#ffffff', marginBottom: 10, cursor: 'pointer' }}
    >
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
          data={fieldTypes}
        />
        <InputField
          name="required"
          label="Required"
          accepter={RadioGroup}
          inline
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </InputField>
      </Form>
    </Panel>
  );
};

export default Card;
