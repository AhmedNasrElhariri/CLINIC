import { Popover, Dropdown } from 'rsuite';
import { CRButton } from 'components';
const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1}>
        <CRButton>Pdf +</CRButton>
      </Dropdown.Item>
      <Dropdown.Item eventKey={2}>
        <CRButton>Excel</CRButton>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
);

export default MenuPopover;
