import React from 'react';
import { Icon } from 'rsuite';
import { Div } from '../../widgets/html/index';
import { Img } from 'components';

const Avatar = ({ url, onClick }) => (
  <Div borderRadius="50%" onClick={onClick} mr={10}>
    {url ? (
      <Img src={url} width={50} height={50} borderRadius="50%" />
    ) : (
      <Icon icon="avatar" size="2x" />
    )}
  </Div>
);

export default Avatar;
