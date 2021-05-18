import React from 'react';

import { sortAppointments } from 'services/appointment';
import { filterAppointments } from './filters';
import { Div } from 'components';
import Filter from './filter';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { specialty: null, branch: null, doctor: null };
  }

  setFormValue = event => {
    this.setState({
      specialty: event.specialty,
      branch: event.branch,
      doctor: event.doctor,
    });
  };
  render() {
    const appointments = this.props.appointments;
    const filteredAppointments = sortAppointments(
      filterAppointments(appointments, this.state)
    );
    const branches = this.props.branches;
    return (
      <>
        <Div mb={4}>
          <Filter
            formValue={this.state}
            onChange={this.setFormValue}
            branches={branches}
          />
        </Div>
        {this.props.render(filteredAppointments)}
      </>
    );
  }
}

export default Appointments;
