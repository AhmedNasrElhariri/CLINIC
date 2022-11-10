import { Select } from "antd";
import { removeCookie, setCookie } from "common/utils/cookies";
import { useGetBranchesQuery } from "features/organization/organizationAPI";
import {
  selectSelectedBranch,
  setSelectedBranch,
} from "features/organization/organizationSlice";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "redux-store/hooks";

export default memo(function BranchSelect() {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetBranchesQuery();
  const selectedBranch = useAppSelector(selectSelectedBranch);

  return (
    <Select
      onClear={() => {
        dispatch(setSelectedBranch(undefined));
        removeCookie("selectedBranch");
      }}
      allowClear
      loading={isFetching}
      disabled={isFetching}
      className="max-w-full w-48"
      showSearch
      value={selectedBranch}
      placeholder="Choose Branch"
      optionFilterProp="children"
      onChange={(value) => {
        if (value) {
          dispatch(setSelectedBranch(value));
          setCookie("selectedBranch", value);
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
