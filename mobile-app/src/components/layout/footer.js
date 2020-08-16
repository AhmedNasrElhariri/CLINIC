import React from 'react';
import { Footer, FooterTab, Text, Button, Icon } from 'native-base';
import { NAVIGATIONS } from '@/utils/constants';

import crVariables from '@/utils/cr-variables';

const FooterItem = ({ title, icon, onPress, active }) => {
  return (
    <Button onPress={onPress}>
      <Icon
        name={icon}
        style={{
          color: active ? crVariables.textColor : crVariables.footerLogoColor,
        }}
      />
      <Text style={{ textTransform: 'capitalize' }}>{title}</Text>
    </Button>
  );
};

const items = [
  {
    id: 1,
    route: NAVIGATIONS.TODAY_APPOINTMENTS,
    title: 'Appointments',
    icon: 'home',
  },
  {
    id: 2,
    route: NAVIGATIONS.CALENDAR,
    title: 'Agenda',
    icon: 'calendar',
  },
  {
    id: 3,
    route: NAVIGATIONS.PATIENTS,
    title: 'Patients',
    icon: 'person',
  },
  {
    id: 4,
    route: NAVIGATIONS.NEW_PATIENT,
    title: 'More',
    icon: 'menu',
  },
];

const CRFooter = ({ navigation, route }) => {
  const path = route.name;
  return (
    <Footer
      style={{
        backgroundColor: '#ffffff',
        shadowOpacity: 0.05,
        shadowRadius: 16,
        shadowOffset: { width: 2, height: 2 },
        elevation: 4,
      }}
    >
      <FooterTab>
        {items.map(({ id, route, title, icon }) => (
          <FooterItem
            key={id}
            onPress={() => navigation.navigate(route)}
            title={title}
            icon={icon}
            active={path === route}
          />
        ))}
      </FooterTab>
    </Footer>
  );
};

export default CRFooter;
