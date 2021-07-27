import React from 'react';
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
    const type = this.props.type;
    const method = this.props.method;
    const filteredAppointments = (
      filterAppointments(appointments, this.state)
    );
    let totalRevenues = 0;
    let totalExpenses = 0;
    if (type === 'accounting') {
      if (method === 'revenues') {
        
        totalRevenues = filteredAppointments?.reduce(
          (acc, e) => acc + e?.amount,
          0
        );
      } else {
        totalExpenses = filteredAppointments?.reduce(
          (acc, e) => acc + e?.amount,
          0
        );
      }
    }
    if (type === 'sales') {
        totalRevenues = filteredAppointments?.reduce(
          (acc, e) => acc + e?.totalPrice,
          0
        );
        totalExpenses = filteredAppointments?.reduce(
          (acc, e) => acc + e?.totalCost,
          0
        );
    }
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
        {this.props.render(filteredAppointments, totalRevenues, totalExpenses)}
      </>
    );
  }
}

export default Appointments;
