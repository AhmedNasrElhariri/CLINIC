import React, { useState, useMemo, useContext, useEffect } from "react";
import * as moment from "moment";
import { SelectPicker, DatePicker, Form, Modal, Button } from "rsuite";
import {
  Container,
  LeftContainer,
  RightContainer,
  InputContainer,
} from "./style";
import * as ls from "../../../../services/local-storage";
import { getCreatableApptTypes } from "../../../../services/constants";
import CRBrancheTree from "../../../../services/branch-tree";
import { useAppointmentForm, allHooks } from "../../../../hooks";
import { useTranslation } from "react-i18next";
import { LangContext } from "../../../../services/context";
export const isBeforeToday = (date) => moment(date).isBefore(moment(), "days");

const NewAppointment = ({
  organizationId,
  open,
  handleClose,
  handleOk,
  formValue,
  setFormValue,
  checkResult,
  validate,
  show,
  setShow,
  createAppointmentLoading,
}) => {
  const { t } = useTranslation();
  const dir = useContext(LangContext);
  const [patientSearchValue, setPatientSearchValue] = useState("");
  const patientId = ls.getPatientId();
  const { searchedPatients } = allHooks({
    patientSearchValue: patientSearchValue,
    organizationId,
  });
  const returnedPatientsOfSearch = useMemo(() => {
    const data = searchedPatients.map((d) => {
      return { label: d.name, value: d.id };
    });
    const filteredData = data.filter((d) => d.value === patientId);
    return filteredData;
  }, [searchedPatients]);

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
        <Modal.Title>{t("ADD_NEW_APPOINTMENT")}</Modal.Title>
      </Modal.Header>
      <div>
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <Container dir={dir}>
            <LeftContainer>
              {formValue.type === "Session" && (
                <InputContainer>
                  <Form.ControlLabel>{t("SESSION")}</Form.ControlLabel>
                  <SelectPicker
                    label="Session Name"
                    onChange={(val) =>
                      setFormValue({ ...formValue, sessionId: val })
                    }
                    value={formValue.sessionId}
                    block
                    data={updatedSessionsDefinition}
                  />
                  {show && checkResult["sessionId"].hasError && (
                    <div className={"rs-form-control-wrapper"}>
                      <Form.ErrorMessage show={show}>
                        {checkResult["sessionId"].errorMessage}
                      </Form.ErrorMessage>
                    </div>
                  )}
                </InputContainer>
              )}
              <CRBrancheTree
                formValue={formValue}
                onChange={setFormValue}
                organizationId={organizationId}
                checkResult={checkResult}
                validate={validate}
                show={show}
                setShow={setShow}
              />
            </LeftContainer>
            <RightContainer>
              <InputContainer>
                <Form.ControlLabel>{t("PATIENT_NAME")}</Form.ControlLabel>
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
                />
                {show && checkResult["patientId"].hasError && (
                  <div className={"rs-form-control-wrapper"}>
                    <Form.ErrorMessage show={show}>
                      {checkResult["patientId"].errorMessage}
                    </Form.ErrorMessage>
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Form.ControlLabel>{t("DATE")}</Form.ControlLabel>
                <DatePicker
                  label="Date"
                  block
                  onChange={(val) => setFormValue({ ...formValue, date: val })}
                  disabledDate={isBeforeToday}
                  placement="auto"
                />
                {show && checkResult["date"].hasError && (
                  <div className={"rs-form-control-wrapper"}>
                    <Form.ErrorMessage show={show}>
                      {checkResult["date"].errorMessage}
                    </Form.ErrorMessage>
                  </div>
                )}
              </InputContainer>
              {!formValue.waiting && formValue?.userId && (
                <InputContainer>
                  <Form.ControlLabel>{t("TIME")}</Form.ControlLabel>
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
                    placement="auto"
                  />
                  {show && checkResult["time"].hasError && (
                    <div className={"rs-form-control-wrapper"}>
                      <Form.ErrorMessage show={show}>
                        {checkResult["time"].errorMessage}
                      </Form.ErrorMessage>
                    </div>
                  )}
                </InputContainer>
              )}{" "}
            </RightContainer>
          </Container>
        </Form>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(true);
              validate && handleOk();
            }}
            appearance="primary"
            loading={createAppointmentLoading}
          >
            {t("OK_APPOINTMENT")}
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            {t("CANCEL")}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};

export default NewAppointment;
