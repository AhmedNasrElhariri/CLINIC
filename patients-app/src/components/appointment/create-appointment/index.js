import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NewAppointment from "./new-appointment";
import { Button } from "rsuite";
import {
  allHooks,
  useAuth,
  patientRegistrations,
  useForm,
} from "../../../hooks";
import moment from "moment";
import { Header, ButtonContainer, LogOutButton } from "./new-appointment/style";
import { useTranslation } from "react-i18next";
import HeaderContainer from "../../shared-components/header";
import { Schema } from "rsuite";

const initialValues = {
  type: "Session",
  patientId: "",
  courseId: null,
  branchId: null,
  specialtyId: null,
  sessionId: null,
  userId: null,
  date: null,
  time: null,
  waiting: false,
};
const { StringType, DateType } = Schema.Types;

const CreateAppointment = () => {
  const { organizationId } = useParams();
  const { t } = useTranslation();
  const model = Schema.Model({
    patientId: StringType().isRequired(t("PATIENT_NAME_ERROR")),
    branchId: StringType().isRequired(t("BRANCH_NAME_ERROR")),
    specialtyId: StringType().isRequired(t("SPECIALTY_NAME_ERROR")),
    sessionId: StringType().isRequired(t("SESSION_NAME_ERROR")),
    userId: StringType().isRequired(t("DOCTOR_NAME_ERROR")),
    date: DateType().isRequired(t("DATE_NAME_ERROR")),
    time: DateType().isRequired(t("TIME_NAME_ERROR")),
  });
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue: initialValues,
      model,
    });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { createAppointment, loading, sessionsDefinition } = allHooks({
    onCreate: () => {
      setFormValue(initialValues);
      setShow(false);
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
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
      />
    </>
  );
};
export default CreateAppointment;
