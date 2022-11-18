import { Select } from "antd";
import { useGetBranchesQuery } from "features/organization/organizationAPI";
import {
  selectSelectedBranch,
  setSelectedBranch,
} from "features/root/rootSlice";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "redux-store/hooks";
import { SELECTED_BRANCH } from "utils/constants";

export default memo(function BranchSelect() {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetBranchesQuery();
  const selectedBranch = useAppSelector(selectSelectedBranch);

  return (
    <Select
      onClear={() => {
        dispatch(setSelectedBranch(null));
        localStorage.removeItem(SELECTED_BRANCH);
      }}
      allowClear
      loading={isFetching}
      disabled={isFetching}
      className="max-w-full w-48"
      showSearch
      value={isFetching ? null : selectedBranch}
      placeholder="Choose Branch"
      optionFilterProp="children"
      onChange={(value) => {
        if (value) {
          dispatch(setSelectedBranch(value));
          localStorage.setItem(SELECTED_BRANCH, value);
        }
      }}
      options={data}
      fieldNames={{ label: "name", value: "id" }}
      filterOption={(input, option) =>
        option?.name.toLowerCase().includes(input.toLowerCase())
      }
    />
  );
});
