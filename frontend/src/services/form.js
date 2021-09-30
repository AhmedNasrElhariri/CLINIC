import React from 'react';
import { Form, Schema, Alert } from 'rsuite';

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

export const Validate = (model, formValue) => {
  const checkresult = model.check(formValue);
  let valid = true;
  for (const val in checkresult) {
    if (checkresult[val].hasError) {
      Alert.error(checkresult[val].errorMessage);
      valid = false;
      break;
    } else {
      continue;
    }
  }
  return valid;
};
