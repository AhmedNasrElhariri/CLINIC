import React from 'react';
import { CRPanel, Div, H5, CRButton } from 'components';
import { SinppetBodyStyled } from './style';

export default function Snippets({ snippets, onEdit, onDelete }) {
  return (
    <Div>
      {snippets.map(s => (
        <Div my={3} key={s.id}>
          <CRPanel header={<H5 fontWeight={600}>{s.title}</H5>} collapsible>
            <Div display="flex" justifyContent="space-between">
              <SinppetBodyStyled>{s.body}</SinppetBodyStyled>
              <Div display="flex" justifyContent="space-around">
                <CRButton mr={10} onClick={() => onEdit(s)}>
                  Edit
                </CRButton>
                <CRButton onClick={() => onDelete(s)}>Delete</CRButton>
              </Div>
            </Div>
          </CRPanel>
        </Div>
      ))}
    </Div>
  );
}

Snippets.propTypes = {};

Snippets.defaultProps = {
  snippets: [],
};
