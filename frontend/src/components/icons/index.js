import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

export const ContainerStyled = styled.img`
  padding: 20px;
  height: 60px;
  width: 60px;
  border-radius: 100px;
`;

export const IconStyled = styled.img.attrs(({ props }) => ({
  ...props,
}))`
  ${space}
`;

export const PrintOLIcon = props => (
  <IconStyled src="/icons/print-outline.png" {...props} />
);
export const CalenderIcon = props => (
  <IconStyled src="/icons/calendarIcon.png" {...props} />
);
export const UserIcon = props => (
  <IconStyled src="/icons/userIcon.png" {...props} />
);
export const EditOLIcon = props => (
  <IconStyled src="/icons/edit-outline.png" {...props} />
);
export const PlusIcon = props => (
  <IconStyled src="/icons/plusIcon.png" {...props} />
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

export const MinusIcon = props => (
  <IconStyled src="/icons/minus.png" {...props} />
);

export const NotificationIcon = props => (
  <IconStyled src="/icons/notification.png" {...props} />
);

export const SettingsIcon = props => (
  <IconStyled src="/icons/settings.png" {...props} />
);

export const CameraIcon = props => (
  <IconStyled src="/icons/camera.svg" {...props} />
);

export const CalendarIcon = props => (
  <IconStyled src="/icons/calendar.png" {...props} />
);

export const LeftArrowIcon = props => (
  <IconStyled src="/icons/left-arrow.svg" {...props} />
);

export const RightArrowIcon = props => (
  <IconStyled src="/icons/right-arrow.svg" {...props} />
);

export const DentalIcon_1_1 = props => (
  <IconStyled src="/icons/dental-1-1.png" {...props} />
);
export const DentalIcon_1_2 = props => (
  <IconStyled src="/icons/dental-1-2.png" {...props} />
);