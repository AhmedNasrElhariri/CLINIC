import React, { useState, memo, useCallback, useMemo } from 'react';
import { Content, Header, Container, List, ListItem } from 'native-base';
import * as R from 'ramda';
import { useLazyQuery } from '@apollo/react-hooks';

import { CRSearch, CRText } from '@/components';
import { SEARCH } from '@/apollo-client/queries';
import SearchTabs from '../components/search/tabs';
import { NAVIGATIONS } from '@/utils/constants';

export const SEARCH_SUBJECTS = Object.freeze({
  ALL: 0,
  PATIENTS: 1,
  SNIPPETS: 2,
});

const PATIENT_TYPE = 'Patient';
const SNIPPET_TYPE = 'Snippet';

const getNavigation = ({ id, type }) =>
  type === PATIENT_TYPE ? [NAVIGATIONS.PATIENT, { id }] : null;

const SearchScreen = ({ navigation, route: { params } }) => {
  const searchFor = R.propOr([SEARCH_SUBJECTS.ALL], 'searchFor')(params);

  const [activeTab, setActiveTab] = useState(0);
  const [search, { data }] = useLazyQuery(SEARCH);

  const patients = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['search', 'patients']),
        R.map(R.assoc('type', PATIENT_TYPE))
      )(data),
    [data]
  );

  const snippets = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['search', 'snippets']),
        R.map(R.assoc('type', SNIPPET_TYPE))
      )(data),
    [data]
  );

  const listData = new Map([
    [0, [...patients, ...snippets]],
    [1, patients],
    [2, snippets],
  ]);

  const handlePressItem = useCallback(
    item => {
      const [url, options] = getNavigation(item);
      navigation.navigate(url, options);
    },
    [navigation]
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
          <SearchTabs active={activeTab} onPress={setActiveTab} />
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
