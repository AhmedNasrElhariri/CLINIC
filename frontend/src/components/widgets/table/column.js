import styled from 'styled-components';

import { Table } from 'rsuite';

const CRColumn = styled(Table.Column)`
  background-color: ${props => props.theme.colors.dark};
  opacity: 0.2;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
`;

export default CRColumn;
