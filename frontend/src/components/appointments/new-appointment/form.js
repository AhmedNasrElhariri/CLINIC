// import React from 'react';
// import { Form, FormGroup, ControlLabel, FormControl, SelectPicker, Button } from 'rsuite';

// export default () => (
//   <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
//     <FormGroup>
//       <ControlLabel>Examination/Followup</ControlLabel>
//       <FormControl
//         name="type"
//         accepter={SelectPicker}
//         defaultValue={0}
//         block
//         cleanable={false}
//         searchable={false}
//         data={appointmentTypes}
//       />
//     </FormGroup>

//     <FormGroup>
//       <ControlLabel>Patient</ControlLabel>
//       <FormControl
//         block
//         name="patient"
//         accepter={SelectPicker}
//         cleanable={true}
//         labelKey="name"
//         valueKey="id"
//         data={patients}
//       />
//       <Button
//         appearance="link"
//         onClick={showModal}
//         disabled={!canAddPatient(formValue)}
//       >
//         New Patient
//       </Button>
//     </FormGroup>

//     <FormGroup>
//       <ControlLabel>Date</ControlLabel>
//       <FormControl
//         block
//         name="date"
//         format="DD-MM-YYYY"
//         accepter={DatePicker}
//         disabledDate={isBeforeToday}
//       />
//     </FormGroup>

//     <Button
//       appearance="primary"
//       block
//       onClick={() => createAppointment({ variables: { input: formValue } })}
//     >
//       Create
//     </Button>
//   </Form>
// );
