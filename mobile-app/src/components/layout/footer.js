import React from 'react';
import { Footer, FooterTab, Text, Icon, Badge, View } from 'native-base';
import { NAVIGATIONS } from '@/utils/constants';

import crVariables from '@/utils/cr-variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useUserInfo from '@/hooks/fetch-user-info';

const FooterItem = ({ title, icon, onPress, type, active, badgeCount }) => {
  return (
    <View>
      {badgeCount > 0 && (
        <Badge
          style={{
            position: 'absolute',
            top: -12,
            right: '10%',
            scaleX: 0.7,
            scaleY: 0.7,
            zIndex: 100,
          }}
        >
          <Text>2</Text>
        </Badge>
      )}
      <TouchableOpacity
        style={{ alignItems: 'center', alignSelf: 'center' }}
        onPress={onPress}
      >
        <Icon
          name={icon}
          type={type}
          style={{
            color: active ? crVariables.textColor : crVariables.footerLogoColor,
            fontSize: 22,
          }}
        />
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 10,
            color: active ? crVariables.textColor : crVariables.footerLogoColor,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

FooterItem.defaultProps = {
  type: 'FontAwesome',
};

const items = [
  {
    id: 1,
    route: NAVIGATIONS.TODAY_APPOINTMENTS,
    title: 'Appointments',
    icon: 'home',
    type: 'Entypo',
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
    icon: 'user-o',
  },
  {
    id: 4,
    route: NAVIGATIONS.NOTIFICATIONS,
    title: 'Notifications',
    icon: 'bell',
    type: 'FontAwesome',
  },
  {
    id: 5,
    route: NAVIGATIONS.PROFILE,
    title: 'More',
    icon: 'navicon',
  },
];

const CRFooter = ({ navigation, route }) => {
  const { notifications } = useUserInfo();
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
      <FooterTab style={{ justifyContent: 'space-around', paddingTop: 10 }}>
        {items.map(({ id, route, ...props }) => (
          <FooterItem
            key={id}
            onPress={() => navigation.navigate(route)}
            active={path === route}
            badgeCount={id === 4 ? notifications.length : undefined}
            {...props}
          />
        ))}
      </FooterTab>
    </Footer>
  );
};

export default CRFooter;
