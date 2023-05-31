import { Div, CRSelectInput } from 'components';
import { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { useUsers } from 'hooks';
const TransferTo = ({
  formValue,
  onChange,
  fromFormValue,
  showError,
  checkResult,
}) => {
  const { users: organizationusers } = useUsers({});

  const ItemName = useMemo(() => {
    const item = fromFormValue?.item;
    let objName = item?.item?.name;
    if (item?.level === 'organization') {
      objName = objName + 'Organization';
    } else if (item?.level === 'branch') {
      objName = objName + '/' + item?.branch?.name + '(Branch)';
    } else if (item?.level === 'specialty') {
      objName = objName + '/' + item?.specialty?.name + '(Speciality)';
    } else {
      objName = objName + '/' + item?.user?.name + '(User)';
    }
    return objName;
  }, [fromFormValue?.item]);
  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.AddCustom_Inventory },
  });
  const branches = useMemo(
    () =>
      R.propOr(
        [],
        'listBranchesTree'
      )(data).filter(b => b.id !== fromFormValue.branchId),
    [data, fromFormValue.branchId]
  );
  const branchDoctors = useMemo(() => {
    return [
      ...new Map(
        branches
          .reduce(
            (acc, { specialties }) => [
              ...acc,
              ...specialties.reduce(
                (acc2, { doctors }) => [...acc2, ...doctors],
                []
              ),
            ],
            []
          )
          .map(item => [item.id, item])
      ).values(),
    ];
  }, [branches]);
  return (
    <Div margin="0px 50px">
      <Div>
        <Div>
          <Div fontWeight="bold" mb="10px">
            Transfer From
          </Div>
          <Div>{ItemName}</Div>
        </Div>
        <Div>
          <Div fontWeight="bold" mb="10px" mt="10px">
            Quantity
          </Div>
          <Div>
            {fromFormValue?.quantity / fromFormValue?.item?.item?.quantity}{' '}
            boxes ({fromFormValue?.quantity} units)
          </Div>
        </Div>{' '}
      </Div>
      <Div fontWeight="bold" m="20px 0px">
        Transfer To
      </Div>
      <Form fluid formValue={formValue} onChange={onChange}>
        <CRSelectInput
          data={branches}
          name="branchId"
          valueKey="id"
          labelKey="name"
          label="Branch"
          block
          errorMessage={
            showError && checkResult['branchId'].hasError
              ? checkResult['branchId'].errorMessage
              : ''
          }
        />
        <CRSelectInput
          data={organizationusers}
          name="userId"
          valueKey="id"
          labelKey="name"
          label="User"
          block
          errorMessage={
            showError && checkResult['userId'].hasError
              ? checkResult['userId'].errorMessage
              : ''
          }
        />
      </Form>
    </Div>
  );
};
export default TransferTo;
