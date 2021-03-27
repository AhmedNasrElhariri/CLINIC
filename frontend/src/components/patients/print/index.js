import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import * as R from 'ramda';
import { saveAs } from 'file-saver';

import { CRButton, CRModal, Div, H7 } from 'components';
import PdfDocument from './pdf-document';
import useModal from 'hooks/use-model';
import { Checkbox } from 'rsuite';
import { formatDate } from 'utils/date';

const PdfFile = ({ fields, patient, data, details, period, onDone }) => {
  useEffect(() => {
    (async () => {
      const blob = await pdf(
        <PdfDocument
          patient={patient}
          data={data}
          details={details}
          fields={fields}
          period={period}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      saveAs.saveAs(url, `${patient.name}.pdf`);

      onDone();
    })();
  }, [data, details, fields, onDone, patient, period]);

  return null;
};

const filterAppointments = (appoitnments, ids) =>
  appoitnments.filter(d => ids.includes(d.id));

const Print = ({ appoitnments, patient, fields, appoitnmentsWithGroups }) => {
  const [selected, setSelected] = useState(false);
  const [checked, setChecked] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const { visible, open, close } = useModal();

  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      open();
    },
    [open]
  );

  const { data, details } = React.useMemo(() => {
    const checkedIds = Object.entries(checked)
      .filter(([key, val]) => val)
      .map(([key, val]) => key);

    return {
      data: filterAppointments(appoitnments, checkedIds).map(appt => appt.data),
      details: filterAppointments(appoitnmentsWithGroups, checkedIds),
    };
  }, [appoitnments, appoitnmentsWithGroups, checked]);

  return (
    <>
      {/* <CRButton variant="primary"  ml={1} onClick={handleClick}>
        Print
      </CRButton> */}
      <CRModal
        header="Print Patient History"
        show={visible}
        onOk={() => {
          setSelected(true);
          close();
        }}
        onHide={close}
      >
        <Div>
          <Div display="flex" alignItems="center" mb={2}>
            <Checkbox
              onChange={() => {
                const val = R.pipe(
                  R.map(R.prop('id')),
                  R.reduce(
                    (obj, id) =>
                      Object.assign(obj, { [id]: allChecked ? false : true }),
                    {}
                  )
                )(appoitnments);
                setChecked(val);
                setAllChecked(!allChecked);
              }}
            />
            <H7 mx={4}>Check All</H7>
          </Div>

          {appoitnments.map(({ id, date }, idx) => (
            <Div
              display="flex"
              alignItems="center"
              key={id}
              justifyContent="space-between"
            >
              <Div display="flex" alignItems="center">
                <Checkbox
                  checked={checked[id] || false}
                  onChange={(_, val) =>
                    setChecked(checked => ({ ...checked, [id]: val }))
                  }
                />
                <H7 mx={4}>Session {idx + 1}</H7>
              </Div>
              <H7 color="texts.1">{formatDate(date)}</H7>
            </Div>
          ))}
        </Div>
      </CRModal>
      {selected && (
        <PdfFile
          onDone={() => {
            setSelected(false);
            setAllChecked(false);
            setChecked({});
          }}
          patient={patient}
          data={data}
          details={details}
          fields={fields}
        />
      )}
    </>
  );
};

Print.defaultProps = {
  appoitnments: [],
  fields: [],
  data: [],
  patient: {},
  appoitnmentsWithGroups: [],
};

export default Print;
