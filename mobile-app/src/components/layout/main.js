import React from 'react';
import {
  Container,
  Header,
  Right,
  Body,
  Title,
  Content,
  Button,
  Icon,
  View,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import Footer from './footer';
import { CRText } from '@/components';
import { NAVIGATIONS } from '@/utils/constants';
import crVariables from '@/utils/cr-variables';

const MainLayout = ({
  children,
  header,
  extra,
  plain,
  search,
  noBack,
  newAppointment,
  refreshControl,
  closeIcon,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Container>
      {!plain && (
        <Header transparent translucent searchBar>
          <Body style={{ marginLeft: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {!noBack && (
                <Icon
                  name="ios-arrow-back"
                  style={{
                    color: crVariables.textColor,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                  onPress={() => navigation.goBack()}
                />
              )}
              {closeIcon && (
                <Icon
                  name="close"
                  style={{
                    color: crVariables.textColor,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                  onPress={() => navigation.goBack()}
                />
              )}
              <Title
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <CRText size={18} weight="bold">
                  {header}
                </CRText>
              </Title>
            </View>
          </Body>
          <Right>
            {search && (
              <Button
                transparent
                onPress={() => navigation.navigate(NAVIGATIONS.SEARCH)}
                small
              >
                <Icon name="search" style={{ color: '#000000', padding: 0 }} />
              </Button>
            )}
            {extra}
          </Right>
        </Header>
      )}
      <Content
        style={{ paddingHorizontal: 30, paddingVertical: 20 }}
        refreshControl={refreshControl}
      >
        {children}
      </Content>
      {newAppointment && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            right: 30,
            width: 60,
            bottom: 80,
            height: 60,
            borderRadius: 60,
            backgroundColor: crVariables.primaryColor,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            type="MaterialIcons"
            name="edit"
            style={{ color: '#ffffff' }}
            onPress={() => navigation.navigate(NAVIGATIONS.NEW_APPOINTMENT)}
          />
        </View>
      )}
      {!plain && <Footer navigation={navigation} route={route} />}
    </Container>
  );
};

MainLayout.defaultProps = {
  plain: false,
  search: false,
  noBack: false,
  newAppointment: false,
  closeIcon: false,
};

export default MainLayout;
