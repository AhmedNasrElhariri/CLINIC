import { CRSelectInput, CRTextArea } from 'components/widgets';
import React from 'react';
import { Form } from 'rsuite';
import { StyledContainer, StyledSelector, StyledUpload, StyledTextArea } from './style';

function UploadImage({}) {
  return (
    <>
      <StyledContainer>
        <StyledUpload/>
        <Form fluid>
          <StyledSelector>
            <CRSelectInput
              labelKey="name"
              valueKey="id"
              name="itemId"
              block
              placeholder="Select Lab"
            ></CRSelectInput>
          </StyledSelector>
          <StyledTextArea>
            <CRTextArea placeholder="Add Caption" />
          </StyledTextArea>
        </Form>
      </StyledContainer>
    </>
  );
}

export default UploadImage;
