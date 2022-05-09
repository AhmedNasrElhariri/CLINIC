import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NewAppointment from "./new-appointment";
import { Button } from "rsuite";
import { allHooks, useAuth, patientRegistrations } from "../../../hooks";
import moment from "moment";
import { Header, ButtonContainer, LogOutButton } from "./new-appointment/style";

const initialValues = {
  type: "Examination",
  patientId: "",
  courseId: null,
  branchId: null,
  session: {},
  specialtyId: null,
  userId: null,
  date: new Date(),
  time: null,
  waiting: false,
};

const CreateAppointment = () => {
  const { organizationId } = useParams();
  const [formValue, setFormValue] = useState(initialValues);
  console.log(formValue,'FFF');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { createAppointment, loading } = allHooks({
    onCreate: () => {
      setFormValue(initialValues);
    },
  });
  const { logout } = patientRegistrations({});
  const handleCreate = useCallback(() => {
    setOpen(false);
    const {
      patientId,
      userId,
      type,
      courseId,
      branchId,
      specialtyId,
      waiting,
      session,
    } = formValue;

    const timeDate = moment(formValue.time);

    let date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });

    if (waiting) {
      date = moment(formValue.date).set({
        hours: "13",
        minute: "00",
        second: "00",
      });
    }
    const sessionId = session?.id;
    const duration = session?.duration;
    const reference = "Online";
    createAppointment({
      patientId,
      type,
      date,
      userId,
      courseId,
      branchId,
      specialtyId,
      waiting,
      sessionId,
      duration,
      reference,
    });
  }, [createAppointment, formValue]);
  const { isAuthenticated } = useAuth();
  return (
    <>
      <LogOutButton onClick={logout}>Log Out</LogOutButton>
      <Header mt="70px">ClinicR</Header>
      <Header mt="30px">Online Booking</Header>
      <ButtonContainer>
        <Button onClick={handleOpen} appearance="primary">
          New Appointment
        </Button>
      </ButtonContainer>
      <NewAppointment
        organizationId={organizationId}
        open={open}
        handleClose={handleClose}
        handleOk={handleCreate}
        formValue={formValue}
        setFormValue={setFormValue}
        loading={loading}
      />
    </>
  );
};
export default CreateAppointment;
