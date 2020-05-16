import React, { useCallback, useEffect } from 'react';
import { Button, Col, Row, Toggle, Divider } from 'rsuite';
import * as R from 'ramda';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { Panel } from 'rsuite';

import { Link } from 'react-router-dom';
import {
  LIST_MY_VIEWS_SUMMARY,
  LIST_MY_VIEWS_STATUS,
  ACTIVATE_VIEW,
} from 'apollo-client/queries';

const Card = ({ name, active, onClick }) => (
  <Panel bordered header={name}>
    Active <Toggle size="md" checked={active} />
    <Divider />
    <Button onClick={onClick} block disabled={active} appearance="primary">
      Activate
    </Button>
  </Panel>
);

export default function ListViews() {
  const { data } = useQuery(LIST_MY_VIEWS_SUMMARY);
  const { data: viewStatusData } = useQuery(LIST_MY_VIEWS_STATUS);
  const [activateView] = useMutation(ACTIVATE_VIEW);

  const views = R.propOr([], 'listMyViews')(data);
  const { activeViewId, defaultViewId } = R.propOr(
    {},
    'listMyViewsStatus'
  )(viewStatusData);

  const onClick = useCallback(
    viewId =>
      activateView({
        variables: {
          viewId,
        },
      }),
    [activateView]
  );

  return (
    <>
      <Link to="/views/new">
        <Button>New</Button>
      </Link>
      <Row>
        {views.map(v => (
          <Col md={6} sm={12} key={v.id}>
            <Card
              {...v}
              active={v.id === activeViewId}
              default={v.id === defaultViewId}
              onClick={() => onClick(v.id)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
