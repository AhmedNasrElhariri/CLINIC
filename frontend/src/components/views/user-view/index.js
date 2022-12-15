import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Form, List, Panel, PanelGroup } from 'rsuite';

import { CRButton, CRTabs, CRTextInput, Div } from 'components/widgets';
import { SELECTOR_WITH_INPUT, SELECTOR } from 'utils/constants';

const getGroups = () => {
  return [
    {
      name: 'Group 1',
      id: 'abd81ec5-6230-4944-a3b9-d392dc7daa45',
      status: 'Static',
      fields: [
        {
          name: 'Field 1',
          type: 'Text',
          id: 'f939c756-199f-4f82-a5e8-696fa086c135',
          __typename: 'Field',
        },
        {
          name: 'Field 2',
          type: 'Selector',
          id: '977dfcc0-5712-4b91-98f6-1a475e5c87c9',
          __typename: 'Field',
        },
        {
          name: 'Field 3',
          type: 'Selector',
          id: '4f7410a1-9715-4cea-bd90-288fc88e53da',
          __typename: 'Field',
        },
        {
          name: 'Field 4',
          type: 'Selector',
          id: '64d5141f-5100-4d95-8f1f-b961c073650f',
          __typename: 'Field',
        },
      ],
      __typename: 'FieldGroup',
    },
    {
      name: 'Group 2',
      id: '0868125a-7177-429d-969a-f8f6f64fcdc0',
      status: 'Static',
      fields: [
        {
          name: 'Field 5',
          type: 'Selector',
          id: 'dbcda583-e046-4d42-bbbb-8c4b80de07f7',
          __typename: 'Field',
        },
        {
          name: 'Field 6',
          type: 'Selector',
          id: 'd82d7bb7-6ef8-4477-8521-496c9f5bc3ae',
          __typename: 'Field',
        },
        {
          name: 'Field 1',
          type: 'Text',
          id: '29cb425f-53b2-4405-927f-805c5b5fbe3f',
          __typename: 'Field',
        },
      ],
      __typename: 'FieldGroup',
    },
  ];
};

const ACTIONS = Object.freeze({
  SET: 'SET',
  ADD_CHOICE: 'ADD_CHOICE',
  DELETE_CHOICE: 'DELETE_CHOICE',
});
const reducer = (state, { action, payload }) => {
  switch (action) {
    case ACTIONS.SET:
      return payload;
    case ACTIONS.ADD_CHOICE:
      return state.map(({ fields, ...rest }) => ({
        ...rest,
        fields: fields.map(field =>
          field.id === payload.fieldId
            ? {
                ...field,
                choices: (field.choices || []).concat(payload.choice),
              }
            : field
        ),
      }));
    default:
      return state;
  }
};

export default function UserView() {
  const [formValue, setFormValue] = useState({});
  const [groups, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const groups = getGroups().map(({ id, name, fields }) => ({
      id,
      name,
      fields: (fields || []).filter(({ type }) =>
        [SELECTOR_WITH_INPUT, SELECTOR].includes(type)
      ),
    }));
    dispatch({ action: ACTIONS.SET, payload: groups });
    const formVal = groups.reduce(
      (acc, { fields }) => ({
        ...acc,
        ...fields.reduce((acc, { id }) => ({ ...acc, [id]: '' }), {}),
      }),
      {}
    );
    setFormValue(formVal);
  }, []);

  const clear = useCallback(
    field => setFormValue(prev => ({ ...prev, [field]: '' })),
    []
  );

  return (
    <div>
      <PanelGroup accordion bordered>
        {groups.map(({ id: groupId, name, fields }) => (
          <Panel key={groupId} header={name}>
            <CRTabs>
              <CRTabs.CRTabsGroup>
                {fields.map(({ id, name }) => (
                  <CRTabs.CRTab key={id}>{name}</CRTabs.CRTab>
                ))}
              </CRTabs.CRTabsGroup>
              <CRTabs.CRContentGroup>
                {fields.map(({ id: fieldId, choices = [] }) => (
                  <CRTabs.CRContent key={fieldId}>
                    <Div>
                      <>
                        <List>
                          {choices.map((item, index) => (
                            <List.Item key={index} index={index}>
                              {item}
                            </List.Item>
                          ))}
                        </List>
                        <Div index={choices.length}>
                          <Form formValue={formValue} onChange={setFormValue}>
                            <Div
                              className="flex-wrap gap-4"
                              mb={10}
                              display="flex"
                              alignItems="center"
                            >
                              <CRTextInput
                                name={fieldId}
                                style={{
                                  width: 400,
                                }}
                              />
                              <CRButton
                                className="self-end"
                                onClick={e => {
                                  dispatch({
                                    action: ACTIONS.ADD_CHOICE,
                                    payload: {
                                      fieldId: fieldId,
                                      choice: formValue[fieldId],
                                    },
                                  });
                                  clear(fieldId);
                                }}
                              >
                                Add
                              </CRButton>
                            </Div>
                          </Form>
                        </Div>
                      </>
                    </Div>
                  </CRTabs.CRContent>
                ))}
              </CRTabs.CRContentGroup>
            </CRTabs>
          </Panel>
        ))}
      </PanelGroup>
      {/* <CRTabs>
        <CRTabs.CRTabsGroup>
          {groups.map(({ id, name }) => (
            <CRTabs.CRTab key={id}>{name}</CRTabs.CRTab>
          ))}
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          {groups.map(({ id: groupId, fields }) => (
            <CRTabs.CRContent key={groupId}>
              <PanelGroup accordion bordered>
                {fields.map(({ id: fieldId, name, choices = [] }) => (
                  <Panel key={fieldId} header={name}>
                    <Div>
                      <>
                        {choices.map((item, index) => (
                          <Div key={item} index={index}>
                            {item}
                          </Div>
                        ))}
                        <Div index={choices.length}>
                          <Form formValue={formValue} onChange={setFormValue}>
                            <Div
                              className="flex-wrap gap-4"
                              mb={10}
                              display="flex"
                              alignItems="center"
                            >
                              <CRTextInput
                                name={fieldId}
                                style={{
                                  width: 400,
                                }}
                              />
                              <CRButton
                                className="self-end"
                                onClick={e => {
                                  dispatch({
                                    action: ACTIONS.ADD_CHOICE,
                                    payload: {
                                      fieldId: fieldId,
                                      choice: formValue[fieldId],
                                    },
                                  });
                                  clear(fieldId);
                                }}
                              >
                                Add
                              </CRButton>
                            </Div>
                          </Form>
                        </Div>
                      </>
                    </Div>
                  </Panel>
                ))}
              </PanelGroup>
            </CRTabs.CRContent>
          ))}
        </CRTabs.CRContentGroup>
      </CRTabs> */}
    </div>
  );
}
