import { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import { Form, Toggle } from "rsuite";
import { H3, Div, CRButton, CRNumberInput } from "components";
import PageSetup from "./page-setup";
import EnableInvoiceCounter from "./enable-invoice-counter/index";
import EnableSMS from "./enable-sms";
import { useConfigurations } from "hooks";
import { useTranslation } from "react-i18next";
import { Button, Divider } from "antd";

const initialValues = {
  enableInvoiceCounter: false,
  enableSMS: false,
  orgName: "",
  orgPhoneNo: "",
};
const initialPointsValue = {
  points: 0,
  couponValue: 0,
};
const initialPageSetup = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  type: "prescription",
};
const initialFollowUp = {
  followUp: false,
};

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const [pointsValue, setPointsValues] = useState(initialPointsValue);
  const [pageSetup, setPageSetup] = useState(initialPageSetup);
  const [followUpValues, setFollowUpValues] = useState(initialFollowUp);
  const { t } = useTranslation();
  const {
    update,
    addPageSetup,
    pageSetupData,
    editPoints,
    points,
    updateSMSConf,
    editFollowUpFeature,
    organization,
  } = useConfigurations();

  useEffect(() => {
    setPointsValues({ points: points.points, couponValue: points.couponValue });
  }, [points, setPointsValues]);

  useEffect(() => {
    const fo = R.propOr(false, "followUp")(organization);
    setFollowUpValues((prev) => ({ ...prev, followUp: fo }));
  }, [organization]);

  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const handleSaveSMS = useCallback(() => {
    const { enableSMS, orgName, orgPhoneNo } = formValue;
    const newFormValue = {
      enableSMS: enableSMS || false,
      orgName: orgName || "",
      orgPhoneNo: orgPhoneNo || "",
    };
    updateSMSConf({
      variables: {
        smsConfig: newFormValue,
      },
    });
  }, [formValue, updateSMSConf]);

  const pageSetupType = pageSetup.type;

  useEffect(() => {
    const pageSetupRow = pageSetupData.find(
      (element) => element.type === pageSetupType
    );
    const top = R.propOr(0, "top")(pageSetupRow);
    const right = R.propOr(0, "right")(pageSetupRow);
    const bottom = R.propOr(0, "bottom")(pageSetupRow);
    const left = R.propOr(0, "left")(pageSetupRow);
    setPageSetup((prev) => ({ ...prev, top, right, bottom, left }));
  }, [pageSetupData, pageSetupType]);

  const updateEnable = useCallback(
    (enable) => {
      setFormValue({
        ...formValue,
        enableInvoiceCounter: enable,
      });
    },
    [formValue]
  );
  const handlePageSetupSave = useCallback(() => {
    addPageSetup({
      variables: {
        pageSetup: pageSetup,
      },
    });
  }, [pageSetup, addPageSetup]);
  const handlePointsSave = useCallback(() => {
    editPoints({
      variables: {
        points: pointsValue.points,
        couponValue: pointsValue.couponValue,
      },
    });
  }, [pointsValue, editPoints]);
  const handleFollowUpSave = useCallback(() => {
    editFollowUpFeature({
      variables: {
        followUp: followUpValues.followUp,
      },
    });
  }, [followUpValues, editFollowUpFeature]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h3 className="text-lg">{t("configurations")}</h3>
        <Button type="primary" onClick={handleSave}>
          {t("save")}
        </Button>
      </div>

      <Divider />

      <EnableInvoiceCounter
        onChange={updateEnable}
        value={formValue?.enableInvoiceCounter}
      />

      <Divider />

      <section>
        <div className="flex justify-between mb-7">
          <h3 className="text-lg">SMS Configuration</h3>
          <Button type="primary" onClick={handleSaveSMS}>
            {t("save")}
          </Button>
        </div>
        <EnableSMS onChange={setFormValue} formValue={formValue} />
      </section>

      <Divider />

      <section>
        <div className="flex justify-end mb-7">
          <Button type="primary" onClick={handlePointsSave}>
            {t("save")}
          </Button>
        </div>
        <Form formValue={pointsValue} onChange={setPointsValues}>
          <div className="flex gap-10 flex-wrap">
            <CRNumberInput
              name="points"
              label={t("theNumberOfPointsToGetCoupon")}
              placeholder="Points"
            />
            <CRNumberInput
              name="couponValue"
              label={t("couponValue")}
              placeholder="Coupon Value"
            />
          </div>
        </Form>
      </section>

      <Divider />

      <section>
        <div className="flex justify-between mb-7">
          <h3 className="text-lg"> {t("followUp")}</h3>
          <Button type="primary" onClick={handleFollowUpSave}>
            {t("save")}
          </Button>
        </div>
        <Form formValue={followUpValues} onChange={setFollowUpValues}>
          <div className="flex justify-between">
            <label>FollowUp feature or not: </label>
            <Toggle
              onChange={(val) =>
                setFollowUpValues({ ...followUpValues, followUp: val })
              }
              checked={followUpValues.followUp}
            />
          </div>
        </Form>
      </section>

      <Divider />

      <section>
        <div className="flex justify-between mb-7">
          <h3 className="text-lg"> {t("pageSetupControl")}</h3>
          <Button type="primary" onClick={handlePageSetupSave}>
            {t("save")}
          </Button>
        </div>
        <PageSetup pageSetup={pageSetup} setPageSetup={setPageSetup} />
      </section>
    </div>
  );
};

export default Configurations;
