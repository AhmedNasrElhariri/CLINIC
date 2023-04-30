import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import * as R from 'ramda';

const useBranchTree = ({ action }) => {
  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: action },
  });
  const filterBranches = useMemo(
    () => R.propOr([], 'listBranchesTree')(branchesTreeData),
    [branchesTreeData]
  );
  return useMemo(() => ({ filterBranches }), [filterBranches]);
};
export default useBranchTree;
