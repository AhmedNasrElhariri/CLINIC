import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CRModal } from 'components';
import { useCoursesDefinition } from 'hooks';
import { mapArrWithIdsToChoices } from 'utils/misc';
import { Form, SelectPicker } from 'rsuite';
import { CRNumberInput, CRSelectInput } from 'components/widgets';
let course = [];
function Course({ visible, onClose, onOk, formValue, onChange, type, users }) {
  const header = useMemo(() => 'Courses', []);
  const ref = useRef();
  const { coursesDefinition } = useCoursesDefinition({});
  const [item, setItem] = useState('');
  const specificCourse = value => {
    course = coursesDefinition.find(course => course.id === value);
    setItem(course.price);
  };
  useEffect(() => {
    formValue.price = item;
    onChange(formValue);
  }, [item, formValue]);
  return (
    <CRModal show={visible} header={header} onHide={onClose} onOk={onOk}>
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'create' ? (
          <>
            <CRSelectInput
              label="Course Name"
              name="courseId"
              placeholder="Select Course"
              block
              cleanable={false}
              searchable={false}
              accepter={SelectPicker}
              data={mapArrWithIdsToChoices(coursesDefinition)}
              onSelect={data => specificCourse(data)}
            />
            <CRNumberInput
              label="Price"
              name="price"
              title="Price"
              value={item}
            />
            <CRNumberInput label="Discount" name="discount" title="Discount" />
          </>
        ) : type === 'edit' ? (
          <CRNumberInput label="Paid" name="paid" title="Paid" />
        ) : (
          <CRSelectInput
            label="Doctor Name"
            name="doctorId"
            placeholder="Select Doctor"
            block
            cleanable={false}
            searchable={false}
            accepter={SelectPicker}
            data={mapArrWithIdsToChoices(users)}
          />
        )}
      </Form>
    </CRModal>
  );
}

Course.defaultProps = {
  type: 'create',
};

export default Course;
