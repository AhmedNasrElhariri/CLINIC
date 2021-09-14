import React from 'react';
import { Container, Partition } from './style';
const Face = ({ onAddFaceOperation }) => {
  return (
    <Container>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 1 ,facePartationName:'part1'})}>
        1
      </Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 2 ,facePartationName:'part2'})}>2</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 3 ,facePartationName:'part3'})}>3</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 4 ,facePartationName:'part4'})}>4</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 5 ,facePartationName:'part5'})}>5</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 6 ,facePartationName:'part6'})}>6</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 7 ,facePartationName:'part7'})}>7</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 8 ,facePartationName:'part8'})}>8</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 9 ,facePartationName:'part9'})}>9</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 10 ,facePartationName:'part10'})}>10</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 11 ,facePartationName:'part11'})}>11</Partition>
      <Partition onClick={() => onAddFaceOperation({ facePartationNumber: 12 ,facePartationName:'part12'})}>12</Partition>
    </Container>
  );
};

export default Face;
