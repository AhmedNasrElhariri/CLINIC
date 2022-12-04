import { H4 } from 'components';

const Header = ({ title }) => (
  <H4
    fontWeight="bold"
    opacity={1}
    textTransform="uppercase"
    textAlign="center"
  >
    {title}
  </H4>
);

export default Header;
