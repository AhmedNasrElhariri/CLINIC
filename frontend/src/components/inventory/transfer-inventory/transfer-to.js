import { Div, CRBrancheTree } from 'components';
import { useMemo } from 'react';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';

const TransferTo = ({ formValue, onChange, fromFormValue }) => {
  const ItemName = useMemo(() => {
    const item = fromFormValue?.item;
    let objName = item?.item?.name;
    console.log(item, objName, '--');
    if (item?.level === '/organization') {
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
  return (
    <Div margin="0px 50px">
      <Div display="flex" justifyContent="space-between">
        <Div>
          <Div fontWeight="bold" mb="20px">
            Transfer To
          </Div>
          <Div>{ItemName}</Div>
        </Div>
        <Div>
          <Div fontWeight="bold" mb="20px">
            Quantity
          </Div>
          <Div>{fromFormValue?.quantity}</Div>
        </Div>{' '}
      </Div>
      <Div fontWeight="bold" m="20px 0px">
        Transfer To
      </Div>
      <Form fluid>
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.AddCustom_Inventory}
          showUserAndOrganization={false}
          notAllowSpecialty
        />
      </Form>
    </Div>
  );
};
export default TransferTo;
