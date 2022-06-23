import React from 'react';
import { Container, Partition } from './style';
import styled from 'styled-components';
import { Div } from 'components';
import {
  Partation1,
  Partation2,
  Partation3,
  Partation4,
  Partation5,
  Partation6,
  Partation7,
  Partation8,
  Partation9,
  Partation10,
  Partation11,
  Partation12,
  Partation13,
  Partation14,
  Partation15,
  Partation16,
  Partation17,
  Partation18,
  Partation19,
} from './face-partations';
export const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Face = ({ onAddFaceOperation, faceOperations }) => {
  const has = number => {
    let exist = false;
    faceOperations.forEach(({ facePartation, id }) => {
      if (facePartation.number === number) {
        exist = true;
      }
    });
    return exist;
  };
  return (
    <>
      <Div width="735px" height="735px" position="relative" m="45px auto">
        <ImageStyled src="/face.png" />
        {/* ...1... */}
        <Partation1 has={has(1)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...2... */}
        <Partation2 has={has(2)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...3... */}
        <Partation3 has={has(3)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...4... */}
        <Partation4 has={has(4)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...5... */}
        <Partation5 has={has(5)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...6... */}
        <Partation6 has={has(6)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...7... */}
        <Partation7 has={has(7)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...8... */}
        <Partation8 has={has(8)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...9... */}
        <Partation9 has={has(9)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...10... */}
        <Partation10 has={has(10)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...11... */}
        <Partation11 has={has(11)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...12... */}
        <Partation12 has={has(12)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...13... */}
        <Partation13 has={has(13)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...14... */}
        <Partation14 has={has(14)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...15... */}
        <Partation15 has={has(15)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...16... */}
        <Partation16 has={has(16)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...17... */}
        <Partation17 has={has(17)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...18... */}
        <Partation18 has={has(18)} onAddFaceOperation={onAddFaceOperation} />
        {/* ...19... */}
        <Partation19 has={has(19)} onAddFaceOperation={onAddFaceOperation} />
      </Div>
    </>
  );
};

export default Face;
