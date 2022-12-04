import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { Div, H5, CRDivider, CRButton } from 'components';
import { createDescription } from 'services/medicine.service';
import { useConfigurations } from 'hooks';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HEIGHT = '680px';

const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: grey;
  position: relative;
`;

const WrapperStyled = styled(Div)`
  width: 500px;
  /* height: calc(100% - 40px); */
  height: ${HEIGHT};
  border: 1px solid black;
  border-radius: 8px;
  background: #ffffff;
`;

const DeleteButtonStyled = styled(CRButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Prescriptions = ({ prescriptions, onDeletePrescriptions }) => {
  const { pageSetupData } = useConfigurations();
  const ref = useRef();

  const pageSetupRow = pageSetupData.find(
    element => element.type === 'prescription'
  );

  const margins = useMemo(
    () =>
      [
        { name: 'top', prop: 'pt' },
        { name: 'right', prop: 'pr' },
        { name: 'bottom', prop: 'pb' },
        { name: 'left', prop: 'pl' },
      ].reduce(
        (acc, { name, prop }) => ({
          ...acc,
          [prop]: (pageSetupRow[name] || 0) * 37.7952755906 + 'px',
        }),
        {}
      ),
    [pageSetupRow]
  );

  return (
    <ContainerStyled>
      <DeleteButtonStyled variant="danger" onClick={onDeletePrescriptions}>
        Delete
      </DeleteButtonStyled>
      <WrapperStyled ref={ref}>
        <Slider dots={null}>
          {prescriptions.map((medicines, index) => (
            <Div key={index} height={HEIGHT} p={4}>
              <Div>
                {medicines.map(({ medicine, dose }, idx) => (
                  <Div key={idx}>
                    <H5 mb={0}>{createDescription(medicine)}</H5>
                    <Div>{dose}</Div>
                    <CRDivider />
                  </Div>
                ))}
              </Div>
            </Div>
          ))}
        </Slider>
      </WrapperStyled>
    </ContainerStyled>
  );
};

Prescriptions.defaultProps = {
  prescriptions: [],
};

export default Prescriptions;
