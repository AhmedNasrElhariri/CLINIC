import React from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  Schema,
} from 'rsuite';

export const isValid = (model, formValue) => {
  return Object.entries(model.check(formValue)).every(
    ([key, value]) => !value.hasError
  );
};

export const CRForm = (schema = []) => {
  const schemaModel = {};
  schema.forEach(item => {
    schemaModel[item.key] = item.type;
  });
  const model = Schema.Model(schemaModel);

  return React.forwardRef((props, ref) => (
    <Form ref={ref} model={model} {...props}>
      {schema.map(item => {
        const { componentClass: ComponentClass, componentProps = {} } = item;

        return <ComponentClass {...componentProps} />;
      })}
    </Form>
  ));
};
