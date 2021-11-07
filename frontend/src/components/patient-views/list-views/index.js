import React, { useCallback, useMemo } from 'react';
import { Button, Col, Row, Toggle, Divider, Alert } from 'rsuite';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { Panel } from 'rsuite';
import * as R from 'ramda';
import useGlobalState from 'state';
import { Div } from 'components';

import {
  LIST_MY_PATIENT_VIEWS_SUMMARY,
  LIST_MY_PATIENT_VIEWS_STATUS,
  ACTIVATE_PATIENT_VIEW,
} from 'apollo-client/queries';

const Card = ({ name, active, onClick, view, id }) => {
  const history = useHistory();
  return (
    <Panel
      bordered
      header={name}
      onSelect={() => {
        history.push(`/patient-views/${id}`, view);
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
  const { data } = useQuery(LIST_MY_PATIENT_VIEWS_SUMMARY);
  const { data: viewStatusData } = useQuery(LIST_MY_PATIENT_VIEWS_STATUS);
  const [activateView] = useMutation(ACTIVATE_PATIENT_VIEW, {
    onCompleted: () => Alert.success('Default view updated'),
    refetchQueries: [
      {
        query: LIST_MY_PATIENT_VIEWS_STATUS,
      },
    ],
  });

  const views = useMemo(() => {
    return R.pipe(
      R.propOr([], 'listMyPatientViews'),
      R.groupBy(R.prop('doctor'))
    )(data);
  }, [data]);
  const activeViewIds = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'listMyPatientViewsStatus'),
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
      <Div>
        <Link to="/patient-views/new">
          <Button appearance="primary">New</Button>
        </Link>
      </Div>
      <Div>
        {Object.entries(views).map(([doctor, userViews]) => {
          return (
            <Div mt={5}>
              <h4>
                {doctor?.name}
                {''}
              </h4>
              <Div>
                <Row>
                  {userViews.map(v => (
                    <Col md={6} sm={12} key={v.id}>
                      <Card
                        {...v}
                        view={v}
                        active={activeViewIds.includes(v.id)}
                        onClick={() => onClick(v.id)}
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
