import React, { useState } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { Form } from 'rsuite';

import { CRModal } from 'components';
import { MY_SNIPPETS } from 'apollo-client/queries';
import { CRSelectInput } from '..';

export default ({ show, onOk, onCancel }) => {
  const { data } = useQuery(MY_SNIPPETS);
  const [formValue, setFormvalue] = useState({ snippet: null });
  const snippets = R.propOr([], 'mySnippets')(data);

  return (
    <CRModal
      show={show}
      header="Select Snippet"
      onOk={() => {
        const snippet = snippets.find(d => d.id === formValue.snippet);
        onOk(R.propOr('', 'body')(snippet));
      }}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <CRModal.CRBody>
        <Form fluid formValue={formValue} onChange={setFormvalue}>
          <CRSelectInput
            label="Title"
            name="snippet"
            labelKey="title"
            valueKey="id"
            block
            cleanable={true}
            searchable={true}
            data={snippets}
          ></CRSelectInput>
        </Form>
      </CRModal.CRBody>
    </CRModal>
  );
};
