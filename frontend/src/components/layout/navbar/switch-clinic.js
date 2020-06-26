import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import * as R from 'ramda';

import { CRSelectInput, Div } from 'components';

export default function SwitchClinic({
  clinics,
  currentClinic,
  onSelectClinic,
}) {
  const choices = useMemo(
    () => clinics.map(({ id, name }) => ({ label: name, value: id })),
    [clinics]
  );

  const onSelect = useCallback(
    id => {
      const clinic = clinics.find(c => c.id === id);
      onSelectClinic(clinic);
    },
    [clinics, onSelectClinic]
  );
  return (
    <Div width={300}>
      <Form fluid>
        <CRSelectInput
          data={choices}
          block
          onSelect={onSelect}
          value={R.prop('id')(currentClinic)}
        />
      </Form>
    </Div>
  );
}

SwitchClinic.propTypes = {
  clinics: PropTypes.array.isRequired,
};

SwitchClinic.defaultProps = {
  clinics: [],
};
