import React, { useMemo } from "react";
import { CRDateRangePicker, Div, CRSelectInput, H4 } from "components";
import { Form, Toggle } from "rsuite";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import { ALL_AREAS,LIST_BRANCHES_TREE } from "apollo-client/queries";
import { useTranslation } from "react-i18next";
import { get } from "services/local-storage";
import { ACTIONS } from "utils/constants";

const options = [
  { name: "FaceBook", id: "facebook" },
  { name: "Instagram", id: "instagram" },
  { name: "Twitter", id: "twitter" },
  { name: "Internet", id: "Internet" },
  { name: "BillBoard", id: "billboard" },
  { name: "Another Doctor", id: "another doctor" },
  { name: "Others", id: "others" },
  { name: "Friends", id: "friends" },
];
const patientLevels = [
  { name: "VIP", id: "VIP" },
  { name: "Normal", id: "Normal" },
];
const ageOptions = [
  { name: "1-10", id: [1, 10] },
  { name: "11-20", id: [11, 20] },
  { name: "21-30", id: [21, 30] },
  { name: "31-40", id: [31, 40] },
  { name: "41-50", id: [41, 50] },
  { name: "51-60", id: [51, 60] },
  { name: "61-70", id: [61, 70] },
  { name: "71-80", id: [71, 80] },
  { name: "81-90", id: [81, 90] },
];
const SEX = ["Male", "Female"].map((s) => ({
  name: s,
  value: s,
}));

const PatientsFilter = ({
  formValue,
  setFormValue,
  areaFormValue,
  setAreaFormValue,
  setPeriod,
}) => {
  const { data } = useQuery(ALL_AREAS);
  const dir = get("dir");
  const areas = useMemo(() => R.propOr([], "areas")(data), [data]);
  const { t } = useTranslation();
  const { data: BranchesData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.Create_Patient },
  });
  const branches = useMemo(
    () => R.propOr([], "listBranchesTree")(BranchesData),
    [data, BranchesData]
  );
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

  const setAreaValue = (val) => {
    setFormValue({ ...formValue, area: val });
    setAreaFormValue({ ...areaFormValue, areaId: val });
  };
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex" justifyContent="space-around" flexWrap="wrap">
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("reference")}
            name="reference"
            data={options}
            onChange={(val) =>
              val == null ? setFormValue({ ...formValue, reference: "" }) : ""
            }
            style={{ width: "200px" }}
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("patientLevel")}
            data={patientLevels}
            name="patientLevel"
            value={formValue.patientLevel}
            onChange={(val) =>
              setFormValue({ ...formValue, patientLevel: val })
            }
            style={{ width: "200px" }}
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("area")}
            name="area"
            data={newAreas}
            value={formValue.area}
            style={{ width: "200px" }}
            onChange={(val) =>
              val == null
                ? (setFormValue({ ...formValue, area: "" }),
                  setAreaFormValue({ areaId: null }))
                : setAreaValue(val)
            }
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("type")}
            name="type"
            valueKey="value"
            searchable={false}
            data={SEX}
            style={{ width: "200px" }}
            block
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("age")}
            name="age"
            data={ageOptions}
            style={{ width: "200px" }}
            block
          />
        </Div>
        <Div ml={3} mr={3}>
          <CRSelectInput
            label={t("branch")}
            name="branchId"
            valueKey="id"
            searchable={false}
            data={branches}
            style={{ width: "200px" }}
            value={formValue.branchId}
            onChange={(val) =>
              setFormValue({ ...formValue, branchId: val })
            }
            block
          />
        </Div>
        <Div width={180}>
          <Form fluid>
            <CRDateRangePicker
              name=""
              label="From - To"
              placeholder={t("timeframe")}
              size="sm"
              block
              small
              placement="auto"
              onChange={setPeriod}
            />
          </Form>
        </Div>
        <Div display="flex" justifyContent="space-between" mb={3} mt={45}>
          <H4 mr={10}>Not comming </H4>
          <Toggle
            onChange={(val) => setFormValue({ ...formValue, enable: val })}
            checked={formValue?.enable}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default PatientsFilter;
