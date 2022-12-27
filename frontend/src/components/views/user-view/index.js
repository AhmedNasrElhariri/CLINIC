import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Form, Icon, List, Panel, PanelGroup, Alert } from 'rsuite';
import { useMutation } from '@apollo/client';

import { CRButton, CRTabs, CRTextInput, Div, H5 } from 'components/widgets';
import useView from 'hooks/view';
import { SELECTOR_WITH_INPUT, SELECTOR } from 'utils/constants';
import { UPDATE_VIEW } from 'apollo-client/queries';

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
    case ACTIONS.DELETE_CHOICE:
      return state.map(({ fields, ...rest }) => ({
        ...rest,
        fields: fields.map(field =>
          field.id === payload.fieldId
            ? {
                ...field,
                choices: field.choices.filter(
                  (_, index) => index !== payload.choiceIndex
                ),
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
  const { userView } = useView();
  const [updateView] = useMutation(UPDATE_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });

  useEffect(() => {
    if (!userView) {
      return;
    }
    const groups = userView.fieldGroups.map(({ id, name, fields }) => ({
      id,
      name,
      fields: (fields || []).filter(({ type }) =>
        [SELECTOR_WITH_INPUT, SELECTOR].includes(type)
      ),
    }));
    dispatch({ action: ACTIONS.SET, payload: userView.fieldGroups });
    const formVal = groups.reduce(
      (acc, { fields }) => ({
        ...acc,
        ...fields.reduce((acc, { id }) => ({ ...acc, [id]: '' }), {}),
      }),
      {}
    );
    setFormValue(formVal);
  }, [userView]);

  const filterGroupFields = useCallback(fields => {
    return (fields || []).filter(({ type }) =>
      [SELECTOR_WITH_INPUT, SELECTOR].includes(type)
    );
  }, []);

  const clear = useCallback(
    field => setFormValue(prev => ({ ...prev, [field]: '' })),
    []
  );

  const handleUpdate = useCallback(() => {
    const updatedView = {
      ...userView,
      fieldGroups: groups,
    };
    updateView({
      variables: {
        view: updatedView,
        viewId: updatedView.id,
      },
    });
  }, [userView, groups, userView]);

  return (
    <div>
      <Div display="flex" justifyContent="end" mb={2}>
        <CRButton onClick={handleUpdate}>Save</CRButton>
      </Div>
      <PanelGroup accordion bordered>
        {groups.map(({ id: groupId, name, fields }) => (
          <Panel key={groupId} header={name}>
            <CRTabs>
              <CRTabs.CRTabsGroup>
                {filterGroupFields(fields).map(({ id, name }) => (
                  <CRTabs.CRTab key={id}>{name}</CRTabs.CRTab>
                ))}
              </CRTabs.CRTabsGroup>
              <CRTabs.CRContentGroup>
                {filterGroupFields(fields).map(
                  ({ id: fieldId, choices = [] }) => (
                    <CRTabs.CRContent key={fieldId}>
                      <Div>
                        <>
                          <List>
                            {choices.map((item, index) => (
                              <List.Item key={index} index={index}>
                                <Div
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  <H5>{item}</H5>
                                  <Icon
                                    icon="trash-o"
                                    style={{
                                      fontSize: 17,
                                      cursor: 'pointer',
                                      color: '#e50124',
                                    }}
                                    onClick={e => {
                                      dispatch({
                                        action: ACTIONS.DELETE_CHOICE,
                                        payload: {
                                          fieldId: fieldId,
                                          choiceIndex: index,
                                        },
                                      });
                                      clear(fieldId);
                                    }}
                                  ></Icon>
                                </Div>
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
                  )
                )}
              </CRTabs.CRContentGroup>
            </CRTabs>
          </Panel>
        ))}
      </PanelGroup>
    </div>
  );
}
