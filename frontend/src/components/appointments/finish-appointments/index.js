import React, { useState, useRef, useCallback } from 'react';

import { CRModal, CRNav } from 'components';
import InventoryUsage from 'components/inventory/usage';
import AppointmentInvoice from '../appointment-invoice';
import { CRCard } from 'components/widgets';
import { Div } from '../../widgets/html/index';

const tabs = [
  { name: 'Invoice', key: '0' },
  { name: 'Inventory', key: '1' },
];

function FinishAppointment({ show, onCancel, onOk, clinic }) {
  const [activeTab, setActiveTab] = useState('0');

  const value = useRef({
    sessions: [],
    items: [],
  });

  const handleInvoiceChange = useCallback(sessions => {
    value.current = { ...value.current, sessions };
  }, []);

  const handleInventoryChange = useCallback(items => {
    value.current = { ...value.current, items };
  }, []);

  return (
    <CRModal
      show={show}
      header="Finish Session"
      onOk={() => onOk(value.current)}
      onHide={onCancel}
      onCancel={onCancel}
      width={1000}
    >
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={300}
        justified
      >
        {tabs.map(({ key, name }) => (
          <CRNav.CRItem key={key} eventKey={key}>
            {name}
          </CRNav.CRItem>
        ))}
      </CRNav>
      <Div mt={4}>
        <CRCard>
          {activeTab === '0' && (
            <AppointmentInvoice
              clinic={clinic}
              onChange={handleInvoiceChange}
            />
          )}
          {activeTab === '1' && (
            <InventoryUsage onChange={handleInventoryChange} />
          )}
        </CRCard>
      </Div>
    </CRModal>
  );
}

FinishAppointment.defaultProps = {
  sessions: [],
  clinic: {},
};

export default FinishAppointment;
