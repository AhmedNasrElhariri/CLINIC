import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import StackNavigator from './stack-navigator';

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <Footer>
      <FooterTab>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Button
              active={isFocused}
              vertical
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
            >
              <Icon name={options.icon} />
              <Text>{label}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
