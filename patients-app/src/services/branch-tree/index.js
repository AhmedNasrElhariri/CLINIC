import React, { useMemo, useEffect } from "react";
import { Form, SelectPicker } from "rsuite";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { LIST_BRANCHES_TREE_BY_ORGANIZATIONID } from "../../apollo-client/queries";
import styled from "styled-components";
import * as R from "ramda";

export const InputContainer = styled.div`
  margin-bottom: 30px;
`;

const CustomBranchTress = ({
  onChange,
  formValue,
  organizationId,
  checkResult,
  validate,
  show,
  setShow,
}) => {
  const { t } = useTranslation();
  const { data } = useQuery(LIST_BRANCHES_TREE_BY_ORGANIZATIONID, {
    variables: { organizationId: organizationId },
  });
  const branches = useMemo(() => {
    const newBranches = R.propOr([], "listBranchesTreeByOrganizationId")(data);
    const updatedBranches = newBranches.map((b) => {
      return {
        label: b.name,
        value: b.id,
        specialties: b.specialties,
      };
    });
    return updatedBranches;
  }, [data]);

  const specialties = useMemo(() => {
    const newSpecialties = R.pipe(
      R.find(R.propEq("value", formValue.branchId)),
      R.propOr([], "specialties")
    )(branches);
    const updatedSpecialties = newSpecialties.map((s) => {
      return {
        label: s.name,
        value: s.id,
        doctors: s.doctors,
      };
    });
    return updatedSpecialties;
  }, [formValue.branchId, branches]);
  console.log(specialties,'specialtiesspecialties','branches',branches);
  const doctors = useMemo(() => {
    const newDoctors = R.pipe(
      R.find(R.propEq("value", formValue?.specialtyId)),
      R.propOr([], "doctors")
    )(specialties);
    const updatedDoctors = newDoctors.map((d) => {
      return {
        label: d.name,
        value: d.id,
      };
    });
    return updatedDoctors;
  }, [formValue?.specialtyId, specialties]);

  return (
    <>
      <Form formValue={formValue} onChange={onChange}>
        <>
          {branches.length > 1 && (
            <InputContainer>
              <Form.ControlLabel>{t("BRANCH")}</Form.ControlLabel>
              <SelectPicker
                label="Branch"
                value={formValue.branchId}
                onChange={(val) => onChange({ ...formValue, branchId: val })}
                block
                data={branches}
              />
              {show && checkResult["branchId"].hasError && (
                <div className={"rs-form-control-wrapper"}>
                  <Form.ErrorMessage show={show}>
                    {checkResult["branchId"].errorMessage}
                  </Form.ErrorMessage>
                </div>
              )}
            </InputContainer>
          )}
          {formValue.branchId && (
            <InputContainer>
              <Form.ControlLabel>{t("SPECIALTY")}</Form.ControlLabel>
              <SelectPicker
                label="Specialty"
                value={formValue.specialtyId}
                onChange={(val) => onChange({ ...formValue, specialtyId: val })}
                block
                data={specialties}
              />
              {show && checkResult["specialtyId"].hasError && (
                <div className={"rs-form-control-wrapper"}>
                  <Form.ErrorMessage show={show}>
                    {checkResult["specialtyId"].errorMessage}
                  </Form.ErrorMessage>
                </div>
              )}
            </InputContainer>
          )}
          {formValue.specialtyId && (
            <InputContainer>
              <Form.ControlLabel>{t("DOCTOR")}</Form.ControlLabel>
              <SelectPicker
                label="Doctor"
                value={formValue.userId}
                onChange={(val) => onChange({ ...formValue, userId: val })}
                placeholder={t('select')}
                block
                data={doctors}
              />
              {show && checkResult["userId"].hasError && (
                <div className={"rs-form-control-wrapper"}>
                  <Form.ErrorMessage show={show}>
                    {checkResult["userId"].errorMessage}
                  </Form.ErrorMessage>
                </div>
              )}
            </InputContainer>
          )}
        </>
      </Form>
    </>
  );
};

const CRBranchTree = ({
  formValue,
  onChange,
  organizationId,
  checkResult,
  validate,
  show,
  setShow,
}) => {
  return (
    <CustomBranchTress
      formValue={formValue}
      onChange={onChange}
      organizationId={organizationId}
      checkResult={checkResult}
      validate={validate}
      show={show}
      setShow={setShow}
    />
  );
};

export default CRBranchTree;
