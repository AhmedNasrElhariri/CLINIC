import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NewAppointment from "./new-appointment";
import { Button } from "rsuite";
import { allHooks, useAuth, patientRegistrations } from "../../../hooks";
import moment from "moment";
import { Header, ButtonContainer, LogOutButton } from "./new-appointment/style";
import { useTranslation } from "react-i18next";
import HeaderContainer from "../../shared-components/header";

const initialValues = {
  type: "Session",
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
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { createAppointment, loading, sessionsDefinition } = allHooks({
    onCreate: () => {
      setFormValue(initialValues);
    },
    organizationId,
  });
  const { logout } = patientRegistrations({ organizationId });
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
      sessionId,
    } = formValue;
    const session = sessionsDefinition.find((s) => s.id === sessionId);
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
      <LogOutButton onClick={logout}>{t("LOG_OUT")}</LogOutButton>
      <HeaderContainer />
      <Header mt="50px">{t("ONLINE_BOOKING")}</Header>
      <ButtonContainer>
        <Button onClick={handleOpen} appearance="primary">
          {t("ADD_NEW_APPOINTMENT")}
        </Button>
      </ButtonContainer>
      <NewAppointment
        organizationId={organizationId}
        open={open}
        handleClose={handleClose}
        handleOk={handleCreate}
        formValue={formValue}
        setFormValue={setFormValue}
        createAppointmentLoading={loading}
      />
    </>
  );
};
export default CreateAppointment;
