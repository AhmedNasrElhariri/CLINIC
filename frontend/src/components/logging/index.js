import React, { useState } from 'react';
import { useCourses, useLogging } from 'hooks';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import ListLogging from './list-logging';

const Logging = () => {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState({
    date: [],
    userId: null,
  });
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const page = currentPage?.activePage;
  const { users } = useCourses({});
  const { loggings, pages, loggingCount } = useLogging({
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    userId: R.propOr(null, 'userId')(formValue),
    page: page,
  });
  
  return (
    <>
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
