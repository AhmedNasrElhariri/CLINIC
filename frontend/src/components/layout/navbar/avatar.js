import React from 'react';
import { Img } from 'components';

const Avatar = ({ onClick }) => (
  <Img
    onClick={onClick}
    src="/images/avatar.jpg"
    width={45}
    height={45}
    borderRadius="50%"
  />
);

export default Avatar;
