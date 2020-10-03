import React, { useState, memo, useCallback } from 'react';
import { Content, Header, Container, List, ListItem } from 'native-base';
import * as R from 'ramda';
import { useLazyQuery } from '@apollo/react-hooks';

import { CRSearch, CRSearchTabs, CRText } from '@/components';
import { SEARCH } from '@/apollo-client/queries';

export const SEARCH_SUBJECTS = Object.freeze({
  ALL: 0,
  PATIENTS: 1,
  SNIPPETS: 2,
});

const SearchScreen = ({ navigation, route: { params } }) => {
  const searchFor = R.propOr([SEARCH_SUBJECTS.ALL], 'searchFor')(params);
  const onPress = R.prop('onPress')(params);

  const [activeTab, setActiveTab] = useState(0);
  const [search, { data }] = useLazyQuery(SEARCH);

  const patients = R.pathOr([], ['search', 'patients'])(data);
  const snippets = R.pathOr([], ['search', 'snippets'])(data);

  const listData = new Map([
    [0, [...patients, ...snippets]],
    [1, patients],
    [2, snippets],
  ]);

  const handlePressItem = useCallback(
    item => {
      onPress(item);
      navigation.goBack();
    },
    [onPress, navigation]
  );

  return (
    <Container>
      <Header searchBar rounded transparent>
        <CRSearch
          onChange={q => search({ variables: { q } })}
          onClose={() => navigation.goBack()}
        />
      </Header>
      <Content style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
        {searchFor.includes(SEARCH_SUBJECTS.ALL) && (
          <CRSearchTabs active={activeTab} onPress={setActiveTab} />
        )}
        <List>
          {listData.get(activeTab).map((item, idx) => (
            <ListItem key={idx} noBorder onPress={() => handlePressItem(item)}>
              <CRText weight="semiBold">{item.searchName}</CRText>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default memo(SearchScreen);
