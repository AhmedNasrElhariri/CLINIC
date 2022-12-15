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
    model: '',
    tag: '',
  });
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const page = currentPage?.activePage;
  const { users } = useCourses({});
  console.log(formValue,'FF');
  const { loggings, pages, loggingCount, models, tagNames } = useLogging({
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    userId: R.propOr(null, 'userId')(formValue),
    page: page,
    model: formValue.model,
    tagName: formValue.tag,
  });

  return (
    <>
      <Filter
        users={users}
        models={models}
        tagNames={tagNames}
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
