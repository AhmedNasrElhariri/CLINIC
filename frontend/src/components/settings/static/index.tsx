import { ReactElement, useState } from "react";
import Hospitals from "./hospitals";
import Surgeries from "./surgeries";
import MedicineDefinition from "./medicine-definition";
import TestDefinition from "./test-definition";
import ImageDefinition from "./image-definition";
import PatientReport from "./patient-report";
import Timing from "./timing";
import LabCategory from "./lab-category";
import ImageCategory from "./image-category";
import Course from "./course";
import SalesDefinition from "./sales-definition";
import SessionDefinition from "./session-definition";
import BanksDefinition from "./banks-definition";
import CompanysDefinition from "./companys-definition";
import CompanysSessions from "./companys-sessions-definition";
import ExpensesTypes from "./expenses-types-definition";
import DentalDiagnosis from "./dental-diagnosis-definition";
import FaceMaterials from "./face-materials";
import AppointmentTypeDefinition from "./appointment-type-definition";
import { useTranslation } from "react-i18next";
import CourseTypeDefinition from "./course-types-definition";
import SupplierAccount from "./supplier-account";
import ItemsDefinitions from "../../inventory/items-definitions";
import { Select } from "antd";

const VIEWS: { [key: string]: ReactElement } = {
  hospitals: <Hospitals />,
  surgeries: <Surgeries />,
  medicineDefinition: <MedicineDefinition />,
  labDefinition: <TestDefinition />,
  labCategory: <LabCategory />,
  imageDefinition: <ImageDefinition />,
  imageCategory: <ImageCategory />,
  timing: <Timing />,
  coursesAndPackages: <Course />,
  salesDefinition: <SalesDefinition />,
  bankDefinition: <BanksDefinition />,
  insuranceCompanies: <CompanysDefinition />,
  insuranceCompaniesSessions: <CompanysSessions />,
  expensesTypes: <ExpensesTypes />,
  sessionsDefinition: <SessionDefinition />,
  dentalDiagnosis: <DentalDiagnosis />,
  faceMaterials: <FaceMaterials />,
  patientReport: <PatientReport />,
  appointmentType: <AppointmentTypeDefinition />,
  courseType: <CourseTypeDefinition />,
  supplierAccount: <SupplierAccount />,
  itemDefinition: <ItemsDefinitions />,
};

const viewsKeys = Object.keys(VIEWS);

function StaticSettings() {
  const [activeView, setView] = useState(viewsKeys[0]);
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <label>Current View:</label>
        <Select
          className="grow max-w-sm text-sm"
          options={viewsKeys.map((k) => ({ label: t(k), value: k }))}
          value={activeView}
          onSelect={(view: string) => setView(view)}
        />
      </div>

      {VIEWS[activeView]}
    </>
  );
}

export default StaticSettings;
