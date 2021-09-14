import React from 'react';
import { Div, CRTextInput } from 'components';
import { Form } from 'rsuite';
const Filter = ({formValue,setFormValue}) => {
    return (
        <Form
            formValue={formValue}
            onChange={setFormValue}
        >
        <Div display="flex">
            <Div mr={3}>
            <CRTextInput
                label="Partation Name Or Date"
                name="name"
                style={{ width: '230px' }}
            />
            </Div>
        </Div>
        </Form>
    );

};

export default Filter;