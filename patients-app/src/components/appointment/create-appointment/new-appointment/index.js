import React, { useState, useMemo } from "react";
import * as moment from "moment";
import { SelectPicker, DatePicker, Form, Modal, Button } from "rsuite";
import { Container, LeftContainer, RightContainer } from "./style";
import * as ls from "../../../../services/local-storage";
import { getCreatableApptTypes } from "../../../../services/constants";
import CRBrancheTree from "../../../../services/branch-tree";
import { useAppointmentForm, allHooks } from "../../../../hooks";
export const isBeforeToday = (date) => moment(date).isBefore(moment(), "days");

const appointmentTypes = getCreatableApptTypes().map((type) => ({
  label: type,
  value: type,
}));

const NewAppointment = ({
  organizationId,
  open,
  handleClose,
  handleOk,
  formValue,
  setFormValue,
  loading,
}) => {
  const [patientSearchValue, setPatientSearchValue] = useState("");
  const { searchedPatients } = allHooks({
    patientSearchValue: patientSearchValue,
    organizationId,
  });
  const returnedPatientsOfSearch = useMemo(() => {
    const data = searchedPatients.map((d) => {
      return { label: d.name, value: d.id };
    });
    const patientId = ls.getPatientId();
    const filteredData = data.filter((d) => d.value === patientId);
    return filteredData;
  }, [searchedPatients]);

  const { patientCourses } = allHooks({
    patientId: formValue.patientId,
  });
  const updatedPatientCourses = patientCourses.map((course) => ({
    label: course.name,
    value: course.id,
  }));

  const { sessionsDefinition } = allHooks({
    organizationId,
  });

  const updatedSessionsDefinition = sessionsDefinition.map((s) => {
    return {
      label: s.name,
      value: s.id,
    };
  });

  const { appointmentsCount } = allHooks({
    date: formValue.date,
    userId: formValue.userId,
  });
  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    appointments: appointmentsCount?.appointments || [],
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header style={{ textAlign: "center", margin: "20px 0px" }}>
        <Modal.Title>ADD NEW APPOINTMENT</Modal.Title>
      </Modal.Header>
      <div>
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <Container>
            <LeftContainer>
              <Form.ControlLabel>Type</Form.ControlLabel>
              <SelectPicker
                label="Examination/Followup"
                value={formValue.type}
                onChange={(val) => setFormValue({ ...formValue, type: val })}
                block
                data={appointmentTypes}
                style={{ marginBottom: "10px" }}
              />

              {formValue.type === "Course" && (
                <>
                  <Form.ControlLabel>Course</Form.ControlLabel>
                  <SelectPicker
                    label="Course"
                    name="courseId"
                    valueKey="IDBTransaction"
                    block
                    data={updatedPatientCourses}
                    style={{ marginBottom: "10px" }}
                  />
                </>
              )}
              {formValue.type === "Session" && (
                <>
                  <Form.ControlLabel>Session</Form.ControlLabel>
                  <SelectPicker
                    label="Session Name"
                    onChange={(val) =>
                      setFormValue({ ...formValue, session: val })
                    }
                    value={formValue.session.name}
                    block
                    data={updatedSessionsDefinition}
                    style={{ marginBottom: "10px" }}
                  />
                </>
              )}
              <CRBrancheTree
                formValue={formValue}
                onChange={setFormValue}
                organizationId={organizationId}
              />
            </LeftContainer>
            <RightContainer>
              <Form.ControlLabel>Patient</Form.ControlLabel>
              <SelectPicker
                label="Patient"
                onSearch={(v) => setPatientSearchValue(v)}
                placeholder="Name / Phone no"
                data={returnedPatientsOfSearch}
                onChange={(val) =>
                  setFormValue({ ...formValue, patientId: val })
                }
                value={formValue.patientId}
                virtualized={false}
                block
                style={{ marginBottom: "10px" }}
              />
              <Form.ControlLabel>Date</Form.ControlLabel>
              <DatePicker
                label="Date"
                block
                name="date"
                disabledDate={isBeforeToday}
                style={{ marginBottom: "10px" }}
              />
              {!formValue.waiting && formValue?.userId && (
                <>
                  <Form.ControlLabel>Time</Form.ControlLabel>
                  <DatePicker
                    label="Time"
                    block
                    value={formValue.time}
                    onSelect={(val) =>
                      setFormValue({ ...formValue, time: val })
                    }
                    onChange={(val) =>
                      setFormValue({ ...formValue, time: val })
                    }
                    format="HH:mm"
                    disabledMinutes={(minute) =>
                      disabledMinutes(minute, moment(formValue.time).hours())
                    }
                    hideHours={hideHours}
                    hideMinutes={(minute) => minute % 5 !== 0}
                    startHour={8}
                    onSelectTrigger
                    style={{ marginBottom: "10px" }}
                  />
                </>
              )}{" "}
            </RightContainer>
          </Container>
          {/* <Checkbox
            name="waiting"
            value={true}
            onChange={(val) => setFormValue({ ...formValue, waiting: val })}
          >
            {" "}
            Add to waiting list
          </Checkbox> */}
        </Form>
        <Modal.Footer>
          <Button onClick={handleOk} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
