import { useMemo } from 'react';
const SelectedRows = ({ checkedKeys, setCheckedKeys, data }) => {
  let checked = false;
  let indeterminate = false;
  if (checkedKeys?.length === data?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (checkedKeys?.length > 0 && checkedKeys?.length < data?.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };
  return useMemo(
    () => ({
      handleCheckAll,
      handleCheck,
      checked,
      indeterminate,
    }),
    [handleCheckAll, handleCheck, checked, indeterminate]
  );
};
export default SelectedRows;
