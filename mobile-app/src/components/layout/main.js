import React from 'react';
import { Container, Header, Left, Body, Title, Content } from 'native-base';

import Footer from './footer';

const MainLayout = ({ children, header, navigation, plain }) => {
  return (
    <Container>
      {!plain && (
        <Header>
          <Left />
          <Body>
            <Title>{header}</Title>
          </Body>
        </Header>
      )}
      <Content style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
        {children}
      </Content>
      {!plain && <Footer navigation={navigation} />}
    </Container>
  );
};

MainLayout.defaultProps = {
  plain: false,
};

export default MainLayout;
