import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import { useForm } from 'hooks';
import {
  MY_SNIPPETS,
  CREATE_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
} from 'apollo-client/queries';
import { NewSnippet, MainContainer, CRButton, ListSnippets } from 'components';
import { useTranslation } from 'react-i18next';

const initialValues = {
  title: '',
  body: '',
};

export default function Snippets() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue: initialValues,
  });
  const { data } = useQuery(MY_SNIPPETS);
  const [create] = useMutation(CREATE_SNIPPET, {
    onCompleted: () => {
      Alert.success('Snippet has been created successfully');
      setVisible(false);
    },
    update(cache, { data: { createSnippet: snippet } }) {
      const { mySnippets } = cache.readQuery({ query: MY_SNIPPETS });
      cache.writeQuery({
        query: MY_SNIPPETS,
        data: { mySnippets: mySnippets.concat([snippet]) },
      });
    },
  });
  const [update] = useMutation(UPDATE_SNIPPET, {
    onCompleted: () => {
      Alert.success('Snippet has been updated successfully');
      setVisible(false);
    },
  });

  const [deleteSnippet] = useMutation(DELETE_SNIPPET, {
    onCompleted: () => {
      Alert.success('Snippet has been deleted successfully');
      setVisible(false);
    },
    update(cache, { data: { deleteSnippet: snippet } }) {
      const { mySnippets } = cache.readQuery({ query: MY_SNIPPETS });
      cache.writeQuery({
        query: MY_SNIPPETS,
        data: { mySnippets: mySnippets.filter(s => s.id != snippet.id) },
      });
    },
  });

  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(() => {
    if (type === 'create') {
      create({
        variables: {
          snippet: formValue,
        },
      });
    } else if (type === 'edit') {
      update({
        variables: {
          snippet: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteSnippet({
        variables: {
          id: formValue?.id,
        },
      });
    }
  }, [type, create, update, deleteSnippet, formValue]);
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initialValues);
    setVisible(true);
  }, [setVisible, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const snippet = R.pick(['id', 'title', 'body'])(data);
      setType('edit');
      setFormValue(snippet);
      setVisible(true);
    },
    [setVisible, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const snippet = R.pick(['id'])(data);
      setType('delete');
      setFormValue(snippet);
      setVisible(true);
    },
    [setVisible, setFormValue, setType]
  );

  const snippets = R.propOr([], 'mySnippets')(data);
  return (
    <>
      <MainContainer
        title={t('snippets')}
        nobody
        more={
          <CRButton onClick={handleClickCreate} variant="primary">
            {t('addNewSnippet')}
          </CRButton>
        }
      ></MainContainer>
      <NewSnippet
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
        type={type}
        formValue={formValue}
        onChange={setFormValue}
      />
      <ListSnippets
        snippets={snippets}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
}

Snippets.propTypes = {};

Snippets.defaultProps = {};
