import React from 'react';
import { Footer, FooterTab, Text, Button, Icon } from 'native-base';
import { NAVIGATIONS } from '@/utils/constants';

import crVariables from '@/utils/cr-variables';

const FooterItem = ({ title, icon, onPress }) => {
  return (
    <Button onPress={onPress}>
      <Icon name={icon} style={{ color: crVariables.footerLogoColor }} />
      <Text style={{ textTransform: 'capitalize' }}>{title}</Text>
    </Button>
  );
};

const CRFooter = ({ navigation }) => {
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
        <FooterItem
          onPress={() => navigation.navigate(NAVIGATIONS.TODAY_APPOINTMENTS)}
          title="Appointments"
          icon="home"
        />
        <FooterItem
          onPress={() => navigation.navigate(NAVIGATIONS.CALENDAR)}
          title="Agenda"
          icon="calendar"
        />
        <FooterItem
          onPress={() => navigation.navigate(NAVIGATIONS.NEW_PATIENT)}
          title="Patients"
          icon="person"
        />
        <FooterItem
          onPress={() => navigation.navigate(NAVIGATIONS.NEW_PATIENT)}
          title="More"
          icon="menu"
        />
      </FooterTab>
    </Footer>
  );
};

export default CRFooter;
