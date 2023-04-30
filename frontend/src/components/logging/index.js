import React, { useState } from 'react';
import { useCourses, useLogging, useUsers } from 'hooks';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import ListLogging from './list-logging';
import axios from 'axios';
import useGlobalState from 'state';
import { Whisper } from 'rsuite';
import { MenuPopover, CRButton } from 'components';

const Logging = () => {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState({
    date: [],
    userId: null,
    model: {},
  });
  const [user] = useGlobalState('user');
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const page = currentPage?.activePage;
  const { users } = useUsers({});
  const { loggings, pages, loggingCount } = useLogging({
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    userId: R.propOr(null, 'userId')(formValue),
    page: page,
    model: formValue.model?.model,
    tagName: formValue.model?.tagName,
  });
  const handleLoggingReportPdf = () => {
    axios({
      url: '/logging/pdf',
      method: 'POST',
      responseType: 'blob', // important
      params: {
        dateFrom: R.pathOr(null, ['date', 0])(formValue),
        dateTo: R.pathOr(null, ['date', 1])(formValue),
        userId: R.propOr(null, 'userId')(formValue),
        model: formValue.model?.model,
        tagName: formValue.model?.tagName,
        organizationId: user.organizationId,
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'logging.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  const handleLoggingExcel = async () => {
    axios({
      url: '/logging/excel',
      responseType: 'blob', // important
      params: {
        dateFrom: R.pathOr(null, ['date', 0])(formValue),
        dateTo: R.pathOr(null, ['date', 1])(formValue),
        userId: R.propOr(null, 'userId')(formValue),
        model: formValue.model?.model,
        tagName: formValue.model?.tagName,
        organizationId: user.organizationId,
      },
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `logging-${Date.now()}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {});
  };
  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleLoggingReportPdf() : handleLoggingExcel();
  }
  return (
    <>
      <Whisper
        placement="bottomStart"
        trigger="click"
        speaker={<MenuPopover onSelect={handleSelectMenu} />}
      >
        <CRButton>Print</CRButton>
      </Whisper>
      <Filter
        users={users}
        formValue={formValue}
        setFormValue={setFormValue}
        t={t}
      />
      <ListLogging
        t={t}
        loggings={loggings}
        pages={pages}
        loggingCount={loggingCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default Logging;
