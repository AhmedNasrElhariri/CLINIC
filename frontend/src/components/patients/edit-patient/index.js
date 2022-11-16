import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import { get } from "services/local-storage";
import { CRModal, Div } from "components";
import { Button } from "rsuite";
import Form from "./form";
import styled from "styled-components";
import { usePatients, useModal } from "hooks";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { ALL_AREAS, LIST_BRANCHES_TREE } from "apollo-client/queries";
import { ACTIONS } from "utils/constants";
const initialValues = {
  name: "",
  phoneNo: "",
  phoneNoTwo: "",
  code: "",
  guardianName: "",
  ageOption: "age",
  phoneOption: "one",
  reference: [],
  age: 0,
  date: new Date(),
  type: "Primary",
  branchId: null,
};
const EditButton = styled(Button)`
  background-color: white;
  color: #50c7f2;
  font-size: 18px;
`;
const EditPatient = ({ patient }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const { visible, open, close } = useModal();
  const { edit } = usePatients({ onEdit: close });

  const { t } = useTranslation();
  const { data } = useQuery(ALL_AREAS);
  const areas = useMemo(() => R.propOr([], "areas")(data), [data]);
  const { data: BranchesData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Patient },
  });
  const branches = useMemo(
    () => R.propOr([], "listBranchesTree")(BranchesData),
    [data, BranchesData]
  );
  useEffect(() => {
    setFormValue(R.omit(["__typename"])(patient));
  }, [patient]);
  const handleEditPatient = useCallback(() => {
    const { remainingOfPayment, ...rest } = formValue;
    edit(rest);
  }, [edit, formValue]);

  const handleOpen = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const dir = get("dir");
  const newAreas = useMemo(() => {
    let newareas = [];
    if (dir === "ltr") {
      newareas = areas.map((a) => {
        return {
          id: a.city_name_en,
          name: a.city_name_en,
        };
      });
    } else {
      newareas = areas.map((a) => {
        return {
          id: a.city_name_ar,
          name: a.city_name_ar,
        };
      });
    }
    return newareas;
  }, [dir, areas]);

  return (
    <>
      <Div onClick={handleOpen}>
        <EditButton onClick={open}>{t("edit")}</EditButton>
        <CRModal
          show={visible}
          onHide={close}
          header={t("editPatient")}
          onCancel={close}
          onOk={handleEditPatient}
        >
          <Form
            onChange={setFormValue}
            formValue={formValue}
            t={t}
            newAreas={newAreas}
            branches={branches}
          />
        </CRModal>
      </Div>
    </>
  );
};

EditPatient.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  onCreate: PropTypes.func,
};

EditPatient.defaultProps = {
  show: false,
};

export default EditPatient;
