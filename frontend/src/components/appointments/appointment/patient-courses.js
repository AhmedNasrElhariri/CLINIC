import { useCallback, useState, useMemo, useEffect } from 'react';
import * as R from 'ramda';
import { Div, H3, CRButton } from 'components';
import useFrom from 'hooks/form';
import { Can } from 'components/user/can';
import NewCourse from 'components/appointments/appointment/courses';
import CourseData from 'components/appointments/appointment/courses/course';
import { useCourses } from 'hooks';
import { useModal } from 'hooks';
import { CRTabs } from 'components';
import { useTranslation } from 'react-i18next';
import { Nav } from 'rsuite';

// import EditableCourse from 'components/appointments/appointment/courses/editable-course';

const initValue = {
  course: null,
  discount: 0,
  paid: 0,
  visaPaid: 0,
  consumed: 0,
  refund: 0,
  doctorId: null,
  sessions: [],
  startDate: null,
  branchId: null,
  specialtyId: null,
  userId: null,
  courseType: 'standard',
  customUnits: 0,
  notes: '',
  consumedDoctorId: null,
};

const Course = ({ patientId }) => {
  const { visible, open, close } = useModal();
  const [course, setCourse] = useState({});
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const [header, setHeader] = useState('');
  const [visa, setVisa] = useState(false);
  const [bank, setBank] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [consumedParts, setConsumedParts] = useState({});
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const {
    addCourse,
    patientCourses,
    editCourse,
    editCourseDoctor,
    editCourseUnits,
    deleteCourse,
    editCoursePaymentHistory,
    users,
    loading,
    finishCourse,
    editCourseUnitHistory,
    courseParts,
  } = useCourses({
    onCreate: () => {
      close();
      setFormValue(initValue);
      setSelectedSessions([]);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
      setConsumedParts({});
    },
    onEditDoctor: () => {
      close();
      setFormValue(initValue);
    },
    onFinishCourse: () => {
      close();
      setFormValue(initValue);
    },
    onDeleteCourse: () => {
      close();
      setFormValue(initValue);
    },
    onEditCoursePaymentHistory: () => {
      close();
      setFormValue(initValue);
    },
    patientId: patientId,
    courseId: course?.id,
  });
  useEffect(() => {
    setCourse(patientCourses[active]);
  }, [patientCourses, active]);

  const handleClickCreate = useCallback(() => {
    setType('create');
    setHeader(t('createNewCourse'));
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType, t]);
  const handleClickEditUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('editConsumedUnits');
      setHeader(t('editConsumedUnits'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickAddUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('addNewUnits');
      setHeader(t('addNewUnits'));
      setFormValue({
        ...course,
        consumedDoctorId: patientCourses[active]?.doctor.id,
      });
      open();
    },
    [open, setFormValue, setType, t, patientCourses, active]
  );
  const handleClickEditPaid = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('edit');
      setHeader(t('addNewPayment'));
      setFormValue({ ...course, paid: 0, visaPaid: 0 });
      open();
    },
    [open, setFormValue, setType, t]
  );

  const handleClickEditHistoryPayment = useCallback(
    data => {
      const course = R.pick(['id', 'paid', 'paymentId'])(data);
      setType('editPaymentHistory');
      setHeader(t('editHistoryPayment'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditDoctor = useCallback(
    data => {
      const course = R.pick(['id', 'doctorId'])(data);
      setType('courseDoctor');
      setHeader(t('assignNewDoctor'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleDeleteCourse = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('deleteCourse');
      setHeader(t('cancelTheCourse'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleFinishCourse = useCallback(
    course => {
      setType('finishCourse');
      setHeader(t('finishTheCourse'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditUnitsHistory = useCallback(
    data => {
      const unitTransaction = R.pick(['id', 'units', 'transactionId', 'notes'])(
        data
      );
      const updatedUnitTransaction = {
        id: unitTransaction.id,
        consumed: unitTransaction.units,
        notes: unitTransaction.notes,
        transactionId: unitTransaction.transactionId,
      };
      setType('editUnitsTransactions');
      setHeader(t('editUnitTransaction'));
      setFormValue(updatedUnitTransaction);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const totalCoursePrice = useMemo(
    () =>
      selectedSessions.reduce(
        (sum, { price, number }) => sum + number * price,
        0
      ),
    [selectedSessions]
  );
  const updatedConsumedUnits = useMemo(() => {
    let entries = Object.entries(consumedParts);
    let data = entries.map(([key, val]) => {
      return { id: key, number: val };
    });
    return data;
  }, [consumedParts]);
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      let price = 0;
      let totalUnits = 0;
      let courseId = null,
        customName = '';

      const {
        discount,
        course,
        sessions,
        paid,
        doctorId,
        specialtyId,
        userId,
        branchId,
        courseType,
        customUnits,
      } = formValue;
      totalUnits = customUnits;
      if (courseType === 'standard' && course) {
        price = course.price;
        courseId = course.id;
      } else {
        selectedSessions.forEach(({ number, name }) => {
          customName += number + '-' + name + ' ';
        });
        price = totalCoursePrice - discount;
        totalUnits = selectedSessions.reduce(
          (sum, { price, numberOfUnits }) => sum + numberOfUnits,
          0
        );
      }
      const finalFormValue = {
        price: price,
        customName: customName,
        customUnits: totalUnits,
        patientId: patientId,
        courseDefinitionId: courseId,
        doctorId,
        sessions,
        paid,
        discount,
        specialtyId,
        userId,
        branchId,
        bank: bank,
        selectedParts: selectedSessions,
      };
      addCourse({
        variables: {
          course: finalFormValue,
        },
      });
    } else if (type === 'courseDoctor') {
      editCourseDoctor({
        variables: {
          courseId: formValue.id,
          doctorId: formValue.doctorId,
        },
      });
    } else if (type === 'finishCourse') {
      finishCourse({
        variables: {
          courseId: formValue.id,
        },
      });
    } else if (type === 'addNewUnits') {
      const val =
        courseParts && courseParts.length > 0
          ? {
              courseId: formValue.id,
              notes: formValue.notes,
              type: 'addNewUnits',
              parts: updatedConsumedUnits,
              doctorId: formValue.consumedDoctorId,
            }
          : {
              courseId: formValue.id,
              consumed: formValue.consumed,
              notes: formValue.notes,
              type: 'addNewUnits',
            };
      editCourseUnits({
        variables: val,
      });
    } else if (type === 'editConsumedUnits') {
      editCourseUnits({
        variables: {
          courseId: formValue.id,
          consumed: formValue.consumed,
          type: 'editConsumedUnits',
        },
      });
    } else if (type === 'editUnitsTransactions') {
      editCourseUnitHistory({
        variables: {
          transactionId: formValue.transactionId,
          consumed: formValue.consumed,
          courseId: formValue.id,
          notes: formValue.notes,
        },
      });
    } else if (type === 'deleteCourse') {
      deleteCourse({
        variables: {
          courseId: formValue.id,
          refund: formValue.refund,
          bank: bank,
          branchId: formValue.branchId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
        },
      });
    } else if (type === 'editPaymentHistory') {
      editCoursePaymentHistory({
        variables: {
          courseId: formValue.id,
          paid: formValue.paid,
          paymentId: formValue.paymentId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
          branchId: formValue.branchId,
        },
      });
    } else {
      editCourse({
        variables: {
          courseId: formValue.id,
          paid: formValue.paid,
          visaPaid: formValue.visaPaid,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
          branchId: formValue.branchId,
          bank: bank,
        },
      });
    }
  }, [
    type,
    formValue,
    patientId,
    addCourse,
    editCourseDoctor,
    editCourse,
    editCoursePaymentHistory,
    finishCourse,
    editCourseUnitHistory,
    bank,
    selectedSessions,
    deleteCourse,
    editCourseUnits,
    totalCoursePrice,
    updatedConsumedUnits,
    courseParts,
  ]);
  const InprogressCourses = useMemo(
    () => patientCourses.filter(c => c.status === 'InProgress'),
    [patientCourses]
  );
  const FinishedCourses = useMemo(
    () =>
      patientCourses.filter(
        c => c.status === 'Finished' || c.status === 'EarlyFinished'
      ),
    [patientCourses]
  );
  const CancelledCourses = useMemo(
    () =>
      patientCourses.filter(
        c => c.status === 'Cancelled' || c.status === 'Rejected'
      ),
    [patientCourses]
  );

  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('inProgressCourses')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('finishedCourses')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('cancelledCourses')}</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between" m="10px 0px">
              <Div width={1000}>
                <>
                  <Nav
                    onSelect={setActive}
                    appearance="tabs"
                    justified
                    className="text-center mb-5"
                    activeKey={active}
                    style={{ borderBottom: '1px solid #d9d9d9' }}
                  >
                    {InprogressCourses.map((course, idx) => (
                      <Nav.Item eventKey={idx} key={idx}>
                        {course.name}
                      </Nav.Item>
                    ))}
                  </Nav>
                  <Div width={200} mt={2}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        {t('addNewCourse')}+
                      </CRButton>
                    </Can>
                  </Div>
                  {InprogressCourses.length > 0 ? (
                    <CourseData
                      courses={InprogressCourses}
                      indx={active}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                      onEditUnitsHistory={handleClickEditUnitsHistory}
                      courseParts={courseParts}
                    />
                  ) : (
                    <H3>{t('noCourses')}</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between">
              <Div width={1000}>
                <>
                  <Nav
                    onSelect={setActive}
                    appearance="tabs"
                    justified
                    className="text-center mb-5"
                    activeKey={active}
                    style={{ borderBottom: '1px solid #d9d9d9' }}
                  >
                    {InprogressCourses.map((course, idx) => (
                      <Nav.Item eventKey={idx}>{course.name}</Nav.Item>
                    ))}
                  </Nav>
                  <Div width={200}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        {t('addNewCourse')}+
                      </CRButton>
                    </Can>
                  </Div>
                  {FinishedCourses.length > 0 ? (
                    <CourseData
                      courses={FinishedCourses}
                      indx={active}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                      onEditUnitsHistory={handleClickEditUnitsHistory}
                      courseParts={courseParts}
                      style={{ borderBottom: '1px solid #d9d9d9' }}
                    />
                  ) : (
                    <H3>{t('noCourses')}</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between">
              <Div width={1000}>
                <>
                  <Nav
                    onSelect={setActive}
                    appearance="tabs"
                    justified
                    className="text-center mb-5"
                    activeKey={active}
                    style={{ borderBottom: '1px solid #d9d9d9' }}
                  >
                    {InprogressCourses.map((course, idx) => (
                      <Nav.Item eventKey={idx}>{course.name}</Nav.Item>
                    ))}
                  </Nav>
                  <Div width={200}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        {t('addNewCourse')}+
                      </CRButton>
                    </Can>
                  </Div>
                  {CancelledCourses.length > 0 ? (
                    <CourseData
                      courses={CancelledCourses}
                      indx={active}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                      onEditUnitsHistory={handleClickEditUnitsHistory}
                      courseParts={courseParts}
                    />
                  ) : (
                    <H3>{t('noCourses')}</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
      <NewCourse
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        header={header}
        type={type}
        loading={loading}
        users={users}
        bank={bank}
        setBank={setBank}
        visa={visa}
        setVisa={setVisa}
        selectedSessions={selectedSessions}
        setSelectedSessions={setSelectedSessions}
        consumedParts={consumedParts}
        setConsumedParts={setConsumedParts}
        courseParts={courseParts}
      />
    </>
  );
};

export default Course;
