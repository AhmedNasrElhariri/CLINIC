import React, { useMemo } from 'react';
import { Form, Schema , FormGroup, RadioGroup, Radio ,FormControl,Checkbox} from 'rsuite';

import { CRModal, CRTextInput , CRRadio } from 'components';


<Form formValue={formValue} model={model} onChange={onChange} fluid>
<CRTextInput label="Medicine Name" name="medicineName" placeholder="Type Name" block/>
<CRTextInput label="Concentration" name="concentration" placeholder="Type Concentration" block />
<CRRadio label="Medicine Form" name="medicineForm" medicineFormValues={medicineFormValues} onChange={onChange} formValue={formValue} />
</Form>