import React, { useMemo, useEffect } from "react";
import { Form, SelectPicker } from "rsuite";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { LIST_BRANCHES_TREE_BY_ORGANIZATIONID } from "../../apollo-client/queries";

import * as R from "ramda";

const CustomBranchTress = ({ onChange, formValue, organizationId }) => {
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
  // useEffect(() => {
  //   if (branches.length == 1) {
  //     onChange({
  //       ...formValue,
  //       branchId: branches[0]?.id,
  //     });
  //   }
  // }, [branches, formValue?.branchId]);
  // useEffect(() => {
  //   if (specialties.length == 1) {
  //     onChange({
  //       ...formValue,
  //       specialtyId: specialties[0]?.id,
  //     });
  //   }
  // }, [specialties, formValue.branchId]);
  // useEffect(() => {
  //   if (doctors.length == 1) {
  //     onChange({
  //       ...formValue,
  //       userId: doctors[0]?.id,
  //     });
  //   }
  // }, [doctors, formValue.specialtyId]);
  return (
    <>
      <Form formValue={formValue} onChange={onChange}>
        <>
          {branches.length > 1 && (
            <>
              <Form.ControlLabel>{t("BRANCH")}</Form.ControlLabel>
              <SelectPicker
                label="Branch"
                value={formValue.branchId}
                onChange={(val) => onChange({ ...formValue, branchId: val })}
                placeholder="Select Branch"
                block
                data={branches}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />
            </>
          )}
          {formValue.branchId && (
            <>
              <Form.ControlLabel>{t("SPECIALTY")}</Form.ControlLabel>
              <SelectPicker
                label="Specialty"
                value={formValue.specialtyId}
                onChange={(val) => onChange({ ...formValue, specialtyId: val })}
                placeholder="Select Specialty"
                block
                data={specialties}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />
            </>
          )}
          {formValue.specialtyId && (
            <>
              <Form.ControlLabel>{t("DOCTOR")}</Form.ControlLabel>
              <SelectPicker
                label="Doctor"
                value={formValue.userId}
                onChange={(val) => onChange({ ...formValue, userId: val })}
                placeholder="Select Doctor"
                block
                data={doctors}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />
            </>
          )}
        </>
      </Form>
    </>
  );
};

const CRBranchTree = ({ formValue, onChange, organizationId }) => {
  return (
    <CustomBranchTress
      formValue={formValue}
      onChange={onChange}
      organizationId={organizationId}
    />
  );
};

export default CRBranchTree;
