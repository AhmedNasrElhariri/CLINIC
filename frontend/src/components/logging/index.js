import React, { useState } from 'react';
import { useCourses, useLogging } from 'hooks';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import ListLogging from './list-logging';
import { CRButton } from 'components';
import axios from 'axios';
import useGlobalState from 'state';

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
  const { users } = useCourses({});
  const { loggings, pages, loggingCount } = useLogging({
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    userId: R.propOr(null, 'userId')(formValue),
    page: page,
    model: formValue.model?.model,
    tagName: formValue.model?.tagName,
  });
  const handleLoggingReport = () => {
    axios({
      url: '/logging',
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
  return (
    <>
      <CRButton variant="primary" onClick={handleLoggingReport} ml={1} mr={1}>
        {t('print')} +
      </CRButton>
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
