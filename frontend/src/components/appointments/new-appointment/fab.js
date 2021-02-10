import React from 'react';

import { Div } from 'components';
import { AddOLIcon, ExitOLIcon } from 'components/icons/index';

export default ({ open, setOpen ,patientModal,setPatientModal,obj}) => {
  return (
    <Div cursor="pointer"  style={{ position:'absolute', right:'50px',bottom:'22px'}}>
      {obj === 1 ? (open ? (
        <ExitOLIcon style={{height:'30px',width:'30px',borderRadius:'30px'}} onClick={() => setOpen(false)} />
      ) : (
        <AddOLIcon style={{height:'30px',width:'30px',borderRadius:'30px'}} onClick={() => setOpen(true) } />
      )) : (patientModal ? (
        <ExitOLIcon style={{height:'30px',width:'30px',borderRadius:'30px'}} onClick={() => setPatientModal(false)} />
      ) : (
        <AddOLIcon style={{height:'30px',width:'30px',borderRadius:'30px'}} onClick={() => setPatientModal(true) } />
      )) }
      
    </Div>
  );
};
