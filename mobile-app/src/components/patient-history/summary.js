import React from 'react';
import { View, Thumbnail } from 'native-base';

import { CRText } from '@/components';

const PatientSummary = ({ name, age, sex, avatar }) => {
  return <View style={{ alignItems: 'center', flexDirection: 'row' }}></View>;
};

PatientSummary.defaultProps = {};

export default PatientSummary;
