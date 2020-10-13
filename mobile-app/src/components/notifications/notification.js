import React from 'react';
import { Icon, View } from 'native-base';
import crVariables from '@/utils/cr-variables';
import moment from 'moment';

import CRText from '../text';

const Notification = ({ message, date }) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: crVariables.textColorLightest,
        paddingBottom: 20,
        paddingTop: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 60,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: crVariables.primaryColor,
            }}
          >
            <Icon
              type="FontAwesome"
              name="bell"
              style={{ color: '#ffffff', fontSize: 15 }}
            />
          </View>
        </View>
        <View style={{ marginLeft: 12, flexShrink: 1 }}>
          <View style={{ flexDirection: 'row', flexShrink: 1 }}>
            <CRText>{message}</CRText>
          </View>
          <CRText weight="semiLight" size={10} variant="light">
            {moment(date).fromNow()}
          </CRText>
        </View>
      </View>
    </View>
  );
};

export default Notification;
