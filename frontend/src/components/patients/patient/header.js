import React from 'react';
import { MdPerson } from 'react-icons/md';
import { CRButton } from 'components';
import { useHistory } from 'react-router-dom';

export default function Header({ patientName, t, appointmentId, className }) {
  const history = useHistory();

  return (
    <section
      className={`flex flex-wrap justify-between items-baseline flex-row
    gap-2 sm:gap-5
    sm:px-7 ${className ?? ''}`}
    >
      <div className="inline-flex items-baseline gap-2 sm:gap-3">
        <MdPerson className="self-center text-4xl sm:text-6xl" />
        <h2 className="text-[1.25rem] text-slate-900">{patientName}</h2>
        <small className="text-[#50c7f2]">Primary</small>
      </div>
      {appointmentId && (
        <CRButton
          onClick={() => history.push(`/appointments/${appointmentId}`)}
          variant="primary"
        >
          {t('currentAppointment')}
        </CRButton>
      )}
    </section>
  );
}
