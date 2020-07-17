import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { MY_SNIPPETS, CREATE_SNIPPET } from 'apollo-client/queries';
import { NewSnippet, MainContainer, CRButton, ListSnippets } from 'components';

export default function Snippets() {
  const [visible, setVisible] = useState(false);
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

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const onCreate = useCallback(
    snippet =>
      create({
        variables: {
          snippet,
        },
      }),
    [create]
  );

  const snippets = R.propOr([], 'mySnippets')(data);

  return (
    <>
      <MainContainer
        title="Snippets"
        nobody
        more={<CRButton onClick={showModal}>New Snippet</CRButton>}
      ></MainContainer>
      <NewSnippet
        onCreate={onCreate}
        show={visible}
        onHide={hideModal}
        onCancel={hideModal}
      />
      <ListSnippets snippets={snippets} />
    </>
  );
}

Snippets.propTypes = {};

Snippets.defaultProps = {};
