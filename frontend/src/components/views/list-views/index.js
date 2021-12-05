import React, { useCallback, useMemo } from 'react';
import { Button, Col, Row, Toggle, Divider, Alert } from 'rsuite';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Panel } from 'rsuite';
import * as R from 'ramda';
import useGlobalState from 'state';
import { Div } from 'components';
import {
  LIST_MY_VIEWS_SUMMARY,
  LIST_MY_VIEWS_STATUS,
  ACTIVATE_VIEW,
} from 'apollo-client/queries';

const Card = ({ name, active, onClick, view, id }) => {
  const history = useHistory();
  const [editLane, setEditLane] = useGlobalState('editLane');
  return (
    <Panel
      bordered
      header={name}
      onSelect={() => {
        history.push(`/views/${id}`, view);
        setEditLane(true);
      }}
    >
      Active <Toggle size="md" checked={active} />
      <Divider />
      <Button onClick={onClick} block disabled={active} appearance="primary">
        Activate
      </Button>
    </Panel>
  );
};

export default function ListViews() {
  const { data } = useQuery(LIST_MY_VIEWS_SUMMARY);
  const { data: viewStatusData } = useQuery(LIST_MY_VIEWS_STATUS);
  const [activateView] = useMutation(ACTIVATE_VIEW, {
    onCompleted: () => Alert.success('Default view updated'),
    update(cache, { data: { activateView } }) {
      const viewStatusDataList = viewStatusData.listMyViewsStatus;
      if (!viewStatusDataList.find(v => v.id === activateView.id)) {
        cache.writeQuery({
          query: LIST_MY_VIEWS_STATUS,
          data: {
            listMyViewsStatus: [...viewStatusDataList, activateView],
          },
        });
      }
    },
  });

  const views = useMemo(() => {
    return R.pipe(R.propOr([], 'listMyViews'), R.groupBy(R.prop('type')))(data);
  }, [data]);
  const activeViewIds = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'listMyViewsStatus'),
        R.map(R.prop('activeViewId'))
      )(viewStatusData),
    [viewStatusData]
  );

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
      <Div display="flex">
        <Link to="/views/new">
          <Button appearance="primary">New</Button>
        </Link>
      </Div>
      <Div>
        {Object.entries(views).map(([type, userViews]) => {
          return (
            <Div mt={5}>
              <h4>{type}</h4>
              <Div>
                <Row>
                  {userViews.map(v => (
                    <Col md={6} sm={12} key={v.id}>
                      <Card
                        {...v}
                        view={v}
                        active={activeViewIds.includes(v.id)}
                        onClick={() => {
                          onClick(v.id);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Div>
            </Div>
          );
        })}
      </Div>
    </>
  );
}
