import React from 'react';
import { TouchableOpacity } from 'react-native';
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
              <Button transparent>
                <TouchableOpacity
                  transparent
                  onPress={
                    noBack && !closeIcon ? null : () => navigation.goBack()
                  }
                  style={{ flexDirection: 'row' }}
                >
                  {!noBack && (
                    <Icon
                      name="ios-arrow-back"
                      style={{
                        color: crVariables.textColor,
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginLeft: 0,
                      }}
                    />
                  )}
                  {closeIcon && (
                    <Icon
                      name="close"
                      style={{
                        color: crVariables.textColor,
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginLeft: 0,
                      }}
                    />
                  )}
                  <Title>
                    <CRText size={18} weight="bold">
                      {header}
                    </CRText>
                  </Title>
                </TouchableOpacity>
              </Button>
            </View>
          </Body>
          <Right>
            {search && (
              <Button transparent small>
                <TouchableOpacity
                  onPress={() => navigation.navigate(NAVIGATIONS.SEARCH)}
                >
                  <Icon
                    name="search"
                    style={{ color: '#000000', padding: 0 }}
                  />
                </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 999,
            right: 30,
            width: 60,
            bottom: 80,
            height: 60,
            borderRadius: 60,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: crVariables.primaryColor,
            elevation: 4,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 2, height: 2 },
          }}
          onPress={() => navigation.navigate(NAVIGATIONS.NEW_APPOINTMENT)}
        >
          <Icon type="MaterialIcons" name="edit" style={{ color: '#ffffff' }} />
        </TouchableOpacity>
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
