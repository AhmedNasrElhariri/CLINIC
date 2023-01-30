import { useCallback } from 'react';
import { Div } from 'components';
// import { useSuergriesAppointments } from 'hooks';
import ListSurgeries from './list-surgeries';

const PatientSurgries = ({ history }) => {
  // const { surgeries } = useSuergriesAppointments({
  //   patientId,
  // });

  const handleClickSurgery = useCallback(data => {
    window.open(`/appointments/${data.id}`);
  }, []);

  return (
    <Div>
      <Div px={5} py={2}>
        <ListSurgeries data={history} onClick={handleClickSurgery} />
      </Div>
      <Div position="absolute" top={0} right={3}></Div>
    </Div>
  );
};

PatientSurgries.defaultProps = {
  surgries: [],
};

export default PatientSurgries;
