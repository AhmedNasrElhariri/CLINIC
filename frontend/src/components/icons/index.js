import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

export const ContainerStyled = styled.img`
  padding: 20px;
  height: 60px;
  width: 60px;
  border-radius: 100px;
`;

export const IconStyled = styled.img.attrs(({ src }) => ({
  src,
}))`
  ${space}
`;

export const PrintOLIcon = props => (
  <IconStyled src="/icons/print-outline.png" {...props} />
);

export const EditOLIcon = props => (
  <IconStyled src="/icons/edit-outline.png" {...props} />
);

export const DeleteOLIcon = props => (
  <IconStyled src="/icons/delete-outline.png" {...props} />
);

export const AddOLIcon = props => (
  <IconStyled src="/icons/add-outline.png" {...props} />
);

export const ExitOLIcon = props => (
  <IconStyled src="/icons/exit-outline.png" {...props} />
);

export const AddIcon = props => <IconStyled src="/icons/add.png" {...props} />;

export const MinusIcon = props => <IconStyled src="/icons/minus.png" {...props} />;

export const NotificationIcon = props => (
  <IconStyled src="/icons/notification.png" {...props} />
);

export const SettingsIcon = props => (
  <IconStyled src="/icons/settings.png" {...props} />
);

export const CameraIcon = props => (
  <IconStyled src="/icons/camera.svg" {...props} />
);

