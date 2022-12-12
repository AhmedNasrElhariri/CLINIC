import { useState } from "react";
import { useTranslation } from "react-i18next";
import ListPatients from "./list-patients";
import ListPatientsReports from "./list-patients-reports";
import { Nav } from "rsuite";

const navKeys = ["patients", "patientReports"];

function Patients() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(navKeys[0]);

  return (
    <>
      <Nav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}>
        {navKeys.map((key) => (
          <Nav.Item eventKey={key}>
            <div className="px-5">{t(key)}</div>
          </Nav.Item>
        ))}
      </Nav>
      {activeTab === navKeys[0] ? <ListPatients /> : <ListPatientsReports />}
    </>
  );
}

export default Patients;
