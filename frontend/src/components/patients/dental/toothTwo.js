import React from 'react';
import { DentalIcon } from './style';
const Tooth = ({
  toothLeftArray,
  toothTopArray,
  toothNumber,
  onAddDiagnosis,
  tooths,
}) => {
  const hasDignosis = (toothNumber, toothPartNumber) => {
    for (let i = 0; i < tooths?.length; i++) {
      if (
        tooths[i]?.toothNumber === toothNumber &&
        tooths[i]?.toothPartNumber === toothPartNumber
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <DentalIcon
        img={
          hasDignosis(toothNumber, 5)
            ? '/icons/dental-tooth-2-1-blue.png'
            : '/icons/dental-tooth-2-1.png'
        }
        top={toothTopArray[0]}
        left={toothLeftArray[0]}
        width="26px"
        height="10px"
        onClick={() =>
          onAddDiagnosis({ toothNumber: toothNumber, toothPartNumber: 5 })
        }
      />
      <DentalIcon
        img={
          hasDignosis(toothNumber, 6)
            ? '/icons/dental-tooth-2-2-blue.png'
            : '/icons/dental-tooth-2-2.png'
        }
        top={toothTopArray[1]}
        left={toothLeftArray[1]}
        width="9px"
        height="26px"
        onClick={() =>
          onAddDiagnosis({ toothNumber: toothNumber, toothPartNumber: 6 })
        }
      />
      <DentalIcon
        img={
          hasDignosis(toothNumber, 7)
            ? '/icons/dental-tooth-2-3-blue.png'
            : '/icons/dental-tooth-2-3.png'
        }
        top={toothTopArray[2]}
        left={toothLeftArray[2]}
        width="26px"
        height="10px"
        onClick={() =>
          onAddDiagnosis({ toothNumber: toothNumber, toothPartNumber: 7 })
        }
      />
      <DentalIcon
        img={
          hasDignosis(toothNumber, 8)
            ? '/icons/dental-tooth-2-4-blue.png'
            : '/icons/dental-tooth-2-4.png'
        }
        top={toothTopArray[3]}
        left={toothLeftArray[3]}
        width="9px"
        height="26px"
        onClick={() =>
          onAddDiagnosis({ toothNumber: toothNumber, toothPartNumber: 8 })
        }
      />
      <DentalIcon
        img={
          hasDignosis(toothNumber, 9)
            ? '/icons/dental-tooth-2-5-blue.png'
            : '/icons/dental-tooth-2-5.png'
        }
        top={toothTopArray[4]}
        left={toothLeftArray[4]}
        width="13px"
        height="11px"
        onClick={() =>
          onAddDiagnosis({ toothNumber: toothNumber, toothPartNumber: 9 })
        }
      />
    </>
  );
};

export default Tooth;
