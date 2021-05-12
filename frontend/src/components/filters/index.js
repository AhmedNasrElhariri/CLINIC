import React from 'react';

import { filterAppointments, sortAppointments } from 'services/appointment';
import { Div } from 'components';
import Filter from './filter';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { specialty: null, branch: null, doctor: null };
  }

  setFormValue = (event) => {
    this.setState({
      specialty: event.specialty,
      branch: event.branch,
      doctor: event.doctor,
    });
  };
  render() {
    const appointments = this.props.appointments;
    const filteredAppointments = sortAppointments(filterAppointments(appointments, this.state));
    return (
      <>
        <Div mb={4}>
          <Filter formValue={this.state} onChange={this.setFormValue} />
        </Div>
        {this.props.render(filteredAppointments)}
      </>
    );
  }
}

export default Appointments;
