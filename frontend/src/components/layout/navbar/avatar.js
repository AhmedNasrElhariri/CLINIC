import React from 'react';
import { Icon } from 'rsuite';
import { Div } from '../../widgets/html/index';

const Avatar = ({ onClick }) => (
  <Div borderRadius="50%" onClick={onClick}>
    <Icon icon="avatar" size="3x" />
  </Div>
  // <Img
  //   onClick={onClick}
  //   src="/images/avatar.svg"
  //   width={45}
  //   height={45}
  //   borderRadius="50%"
  // />
);

export default Avatar;
