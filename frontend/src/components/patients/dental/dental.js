import React from 'react';
import Tooth from './tooth';
import ToothTypeTwo from './toothTwo';
import { Container, NumberHeader, DentalIcon } from './style';
import { Div } from 'components';
import * as R from 'ramda';

const Dental = ({ onAddDiagnosis, tooths }) => {
  const hasDignosis = (toothNumber, toothPartNumber) => {
    for (let i = 0; i < tooths.length; i++) {
      if (
        tooths[i].toothNumber === toothNumber &&
        tooths[i].toothPartNumber === toothPartNumber
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <Div>
      <Container />
      <NumberHeader
        src="/icons/dentalNumberHeader.png"
        top="285px"
        left="249px"
        width="609px"
        height="19px"
      />
      {/* 1 */}
      <DentalIcon
        img={
          hasDignosis(1, 1)
            ? '/icons/dental-1-1-blue.png'
            : '/icons/dental-1-1.png'
        }
        width="7px"
        height="22px"
        top="318px"
        left="250px"
        onClick={() => onAddDiagnosis({ toothNumber: 1, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(1, 2)
            ? '/icons/dental-1-2-blue.png'
            : '/icons/dental-1-2.png'
        }
        width="21px"
        height="30px"
        top="323px"
        left="244px"
        onClick={() => onAddDiagnosis({ toothNumber: 1, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(1, 3)
            ? '/icons/dental-3-3-blue.png'
            : '/icons/dental-3-1.png'
        }
        width="25px"
        height="23px"
        top="352px"
        left="241px"
        onClick={() => onAddDiagnosis({ toothNumber: 1, toothPartNumber: 3 })}
      />

      {/* 2 */}
      <DentalIcon
        img={
          hasDignosis(2, 1)
            ? '/icons/dental-1-1-blue.png'
            : '/icons/dental-1-1.png'
        }
        width="7px"
        height="22px"
        top="318px"
        left="290px"
        onClick={() => onAddDiagnosis({ toothNumber: 2, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(2, 2)
            ? '/icons/dental-1-2-blue.png'
            : '/icons/dental-1-2.png'
        }
        width="20px"
        height="30px"
        top="323px"
        left="284px"
        onClick={() => onAddDiagnosis({ toothNumber: 2, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(2, 3)
            ? '/icons/dental-3-3-blue.png'
            : '/icons/dental-3-1.png'
        }
        width="25px"
        height="23px"
        top="352px"
        left="281px"
        onClick={() => onAddDiagnosis({ toothNumber: 2, toothPartNumber: 3 })}
      />
      {/* 3 */}
      <DentalIcon
        img={
          hasDignosis(3, 1)
            ? '/icons/dental-1-1-blue.png'
            : '/icons/dental-1-1.png'
        }
        width="7px"
        height="22px"
        top="318px"
        left="328px"
        onClick={() => onAddDiagnosis({ toothNumber: 3, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(3, 2)
            ? '/icons/dental-1-2-blue.png'
            : '/icons/dental-1-2.png'
        }
        width="20px"
        height="30px"
        top="323px"
        left="323px"
        onClick={() => onAddDiagnosis({ toothNumber: 3, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(3, 3)
            ? '/icons/dental-3-3-blue.png'
            : '/icons/dental-3-1.png'
        }
        width="27px"
        height="26px"
        top="354px"
        left="319px"
        onClick={() => onAddDiagnosis({ toothNumber: 3, toothPartNumber: 3 })}
      />
      {/* 4 */}
      <DentalIcon
        img={
          hasDignosis(4, 1)
            ? '/icons/dental-4-1-blue.png'
            : '/icons/dental-4-1.png'
        }
        width="17px"
        height="36px"
        top="320px"
        left="365px"
        onClick={() => onAddDiagnosis({ toothNumber: 4, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(4, 2)
            ? '/icons/dental-4-2-blue.png'
            : '/icons/dental-4-2.png'
        }
        width="6px"
        height="22px"
        top="320px"
        left="373px"
        onClick={() => onAddDiagnosis({ toothNumber: 4, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(4, 3)
            ? '/icons/dental-4-3-blue.png'
            : '/icons/dental-4-3.png'
        }
        width="22px"
        height="25px"
        top="356px"
        left="361px"
        onClick={() => onAddDiagnosis({ toothNumber: 4, toothPartNumber: 3 })}
      />

      {/* 5 */}
      <DentalIcon
        img={
          hasDignosis(5, 1)
            ? '/icons/dental-5-1-blue.png'
            : '/icons/dental-5-1.png'
        }
        width="16px"
        height="36px"
        top="320px"
        left="404px"
        onClick={() => onAddDiagnosis({ toothNumber: 5, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(5, 2)
            ? '/icons/dental-5-2-blue.png'
            : '/icons/dental-5-2.png'
        }
        width="22px"
        height="27px"
        top="352px"
        left="401px"
        onClick={() => onAddDiagnosis({ toothNumber: 5, toothPartNumber: 2 })}
      />

      {/* 6 */}
      <DentalIcon
        img={
          hasDignosis(6, 1)
            ? '/icons/dental-6-1-blue.png'
            : '/icons/dental-6-1.png'
        }
        width="16px"
        height="42px"
        top="312px"
        left="444px"
        onClick={() => onAddDiagnosis({ toothNumber: 6, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(6, 2)
            ? '/icons/dental-6-2-blue.png'
            : '/icons/dental-6-2.png'
        }
        width="23px"
        height="28px"
        top="353px"
        left="441px"
        onClick={() => onAddDiagnosis({ toothNumber: 6, toothPartNumber: 2 })}
      />

      {/* 7 */}
      <DentalIcon
        img={
          hasDignosis(7, 1)
            ? '/icons/dental-7-1-blue.png'
            : '/icons/dental-7-1.png'
        }
        width="18px"
        height="37px"
        top="319px"
        left="482px"
        onClick={() => onAddDiagnosis({ toothNumber: 7, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(7, 2)
            ? '/icons/dental-7-2-blue.png'
            : '/icons/dental-7-2.png'
        }
        width="21px"
        height="25px"
        top="355px"
        left="479px"
        onClick={() => onAddDiagnosis({ toothNumber: 7, toothPartNumber: 2 })}
      />
      {/* 8 */}
      <DentalIcon
        img={
          hasDignosis(8, 1)
            ? '/icons/dental-8-1-blue.png'
            : '/icons/dental-8-1.png'
        }
        width="18px"
        height="40px"
        top="319px"
        left="520px"
        onClick={() => onAddDiagnosis({ toothNumber: 8, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(8, 2)
            ? '/icons/dental-8-2-blue.png'
            : '/icons/dental-8-2.png'
        }
        width="25px"
        height="30px"
        top="353px"
        left="518px"
        onClick={() => onAddDiagnosis({ toothNumber: 8, toothPartNumber: 2 })}
      />

      {/* 9 */}
      <DentalIcon
        img={
          hasDignosis(9, 1)
            ? '/icons/dental-9-1-blue.png'
            : '/icons/dental-9-1.png'
        }
        width="19px"
        height="38px"
        top="319px"
        left="564px"
        onClick={() => onAddDiagnosis({ toothNumber: 9, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(9, 2)
            ? '/icons/dental-9-2-blue.png'
            : '/icons/dental-9-2.png'
        }
        width="25px"
        height="30px"
        top="353px"
        left="561px"
        onClick={() => onAddDiagnosis({ toothNumber: 9, toothPartNumber: 2 })}
      />

      {/* 10 */}
      <DentalIcon
        img={
          hasDignosis(10, 1)
            ? '/icons/dental-10-1-blue.png'
            : '/icons/dental-10-1.png'
        }
        width="16px"
        height="37px"
        top="320px"
        left="605px"
        onClick={() => onAddDiagnosis({ toothNumber: 10, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(10, 2)
            ? '/icons/dental-10-2-blue.png'
            : '/icons/dental-10-2.png'
        }
        width="22px"
        height="25px"
        top="355px"
        left="603px"
        onClick={() => onAddDiagnosis({ toothNumber: 10, toothPartNumber: 2 })}
      />

      {/* 11 */}
      <DentalIcon
        img={
          hasDignosis(11, 1)
            ? '/icons/dental-11-1-blue.png'
            : '/icons/dental-11-1.png'
        }
        width="16px"
        height="42px"
        top="311px"
        left="644px"
        onClick={() => onAddDiagnosis({ toothNumber: 11, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(11, 2)
            ? '/icons/dental-11-2-blue.png'
            : '/icons/dental-11-2.png'
        }
        width="23px"
        height="28px"
        top="352px"
        left="641px"
        onClick={() => onAddDiagnosis({ toothNumber: 11, toothPartNumber: 2 })}
      />

      {/* 12 */}
      <DentalIcon
        img={
          hasDignosis(12, 1)
            ? '/icons/dental-12-1-blue.png'
            : '/icons/dental-12-1.png'
        }
        width="16px"
        height="36px"
        top="320px"
        left="683px"
        onClick={() => onAddDiagnosis({ toothNumber: 12, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(12, 2)
            ? '/icons/dental-12-2-blue.png'
            : '/icons/dental-12-2.png'
        }
        width="22px"
        height="27px"
        top="352px"
        left="680px"
        onClick={() => onAddDiagnosis({ toothNumber: 12, toothPartNumber: 2 })}
      />

      {/* 13 */}
      <DentalIcon
        img={
          hasDignosis(13, 1)
            ? '/icons/dental-13-1-blue.png'
            : '/icons/dental-13-1.png'
        }
        width="17px"
        height="36px"
        top="320px"
        left="723px"
        onClick={() => onAddDiagnosis({ toothNumber: 13, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(13, 2)
            ? '/icons/dental-13-2-blue.png'
            : '/icons/dental-13-2.png'
        }
        width="6px"
        height="22px"
        top="320px"
        left="725px"
        onClick={() => onAddDiagnosis({ toothNumber: 13, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(13, 3)
            ? '/icons/dental-13-3-blue.png'
            : '/icons/dental-13-3.png'
        }
        width="22px"
        height="25px"
        top="356px"
        left="721px"
        onClick={() => onAddDiagnosis({ toothNumber: 13, toothPartNumber: 3 })}
      />

      {/* 14 */}
      <DentalIcon
        img={
          hasDignosis(14, 1)
            ? '/icons/dental-14-1-blue.png'
            : '/icons/dental-14-1.png'
        }
        width="6px"
        height="23px"
        top="320px"
        left="767px"
        onClick={() => onAddDiagnosis({ toothNumber: 14, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(14, 2)
            ? '/icons/dental-14-2-blue.png'
            : '/icons/dental-14-2.png'
        }
        width="22px"
        height="32px"
        top="326px"
        left="758px"
        onClick={() => onAddDiagnosis({ toothNumber: 14, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(14, 3)
            ? '/icons/dental-14-3-blue.png'
            : '/icons/dental-14-3.png'
        }
        width="27px"
        height="26px"
        top="355px"
        left="757px"
        onClick={() => onAddDiagnosis({ toothNumber: 14, toothPartNumber: 3 })}
      />

      {/* 15 */}
      <DentalIcon
        img={
          hasDignosis(15, 1)
            ? '/icons/dental-14-1-blue.png'
            : '/icons/dental-15-1.png'
        }
        width="7px"
        height="22px"
        top="320px"
        left="807px"
        onClick={() => onAddDiagnosis({ toothNumber: 15, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(15, 2)
            ? '/icons/dental-14-2-blue.png'
            : '/icons/dental-15-2.png'
        }
        width="20px"
        height="30px"
        top="326px"
        left="799px"
        onClick={() => onAddDiagnosis({ toothNumber: 15, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(15, 3)
            ? '/icons/dental-14-3-blue.png'
            : '/icons/dental-15-3.png'
        }
        width="25px"
        height="24px"
        top="355px"
        left="798px"
        onClick={() => onAddDiagnosis({ toothNumber: 15, toothPartNumber: 3 })}
      />

      {/* 16 */}
      <DentalIcon
        img={
          hasDignosis(16, 1)
            ? '/icons/dental-14-1-blue.png'
            : '/icons/dental-16-1.png'
        }
        width="7px"
        height="22px"
        top="320px"
        left="847px"
        onClick={() => onAddDiagnosis({ toothNumber: 16, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(16, 2)
            ? '/icons/dental-14-2-blue.png'
            : '/icons/dental-16-2.png'
        }
        width="20px"
        height="30px"
        top="325px"
        left="839px"
        onClick={() => onAddDiagnosis({ toothNumber: 16, toothPartNumber: 2 })}
      />
      <DentalIcon
        img={
          hasDignosis(16, 3)
            ? '/icons/dental-14-3-blue.png'
            : '/icons/dental-16-3.png'
        }
        width="25px"
        height="23px"
        top="353px"
        left="838px"
        onClick={() => onAddDiagnosis({ toothNumber: 16, toothPartNumber: 3 })}
      />
      {/* //////////// */}

      {/* 2-1 */}
      <Tooth
        toothLeftArray={['240px', '256px', '240px', '238px', '247px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={1}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-2 */}
      <Tooth
        toothLeftArray={['280px', '296px', '279px', '278px', '286px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={2}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-3 */}
      <Tooth
        toothLeftArray={['321px', '337px', '321px', '318px', '327px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={3}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-4 */}
      <Tooth
        toothLeftArray={['360px', '376px', '360px', '358px', '366px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={4}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-5 */}
      <Tooth
        toothLeftArray={['401px', '417px', '400px', '398px', '407px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={5}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 2-6 */}
      <ToothTypeTwo
        toothLeftArray={['439px', '458px', '439px', '438px', '446px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={6}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-7 */}
      <ToothTypeTwo
        toothLeftArray={['478px', '496px', '478px', '476px', '484px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={7}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-8 */}
      <ToothTypeTwo
        toothLeftArray={['519px', '537px', '519px', '517px', '525px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={8}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 2-9 */}
      <ToothTypeTwo
        toothLeftArray={['560px', '578px', '560px', '558px', '567px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={9}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-10 */}
      <ToothTypeTwo
        toothLeftArray={['601px', '619px', '601px', '599px', '607px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={10}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-11 */}
      <ToothTypeTwo
        toothLeftArray={['639px', '657px', '639px', '637px', '646px']}
        toothTopArray={['386px', '388px', '406px', '388px', '396px']}
        toothNumber={11}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-12 */}
      <Tooth
        toothLeftArray={['677px', '694px', '678px', '675px', '684px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={12}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-13 */}
      <Tooth
        toothLeftArray={['717px', '734px', '718px', '716px', '724px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={13}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-14 */}
      <Tooth
        toothLeftArray={['757px', '774px', '757px', '755px', '764px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={14}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-15 */}
      <Tooth
        toothLeftArray={['798px', '814px', '798px', '796px', '804px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={15}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 2-16 */}
      <Tooth
        toothLeftArray={['837px', '854px', '836px', '835px', '844px']}
        toothTopArray={['387px', '389px', '405px', '389px', '395px']}
        toothNumber={16}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* //////////// */}

      {/* 3-1 */}
      <Tooth
        toothLeftArray={['240px', '256px', '240px', '238px', '247px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={32}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-2 */}
      <Tooth
        toothLeftArray={['280px', '296px', '279px', '278px', '286px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={31}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-3 */}
      <Tooth
        toothLeftArray={['321px', '337px', '321px', '318px', '327px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={30}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-4 */}
      <Tooth
        toothLeftArray={['360px', '376px', '360px', '358px', '366px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={29}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-5 */}
      <Tooth
        toothLeftArray={['401px', '417px', '400px', '398px', '407px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={28}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 3-6 */}
      <ToothTypeTwo
        toothLeftArray={['439px', '458px', '439px', '438px', '446px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={27}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-7 */}
      <ToothTypeTwo
        toothLeftArray={['478px', '496px', '478px', '476px', '484px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={26}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-8 */}
      <ToothTypeTwo
        toothLeftArray={['519px', '537px', '519px', '517px', '525px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={25}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 3-9 */}
      <ToothTypeTwo
        toothLeftArray={['560px', '578px', '560px', '558px', '567px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={24}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-10 */}
      <ToothTypeTwo
        toothLeftArray={['601px', '619px', '601px', '599px', '607px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={23}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-11 */}
      <ToothTypeTwo
        toothLeftArray={['639px', '657px', '639px', '637px', '646px']}
        toothTopArray={['427px', '429px', '446px', '429px', '436px']}
        toothNumber={22}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 3-12 */}
      <Tooth
        toothLeftArray={['677px', '694px', '678px', '675px', '684px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={21}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-13 */}
      <Tooth
        toothLeftArray={['717px', '734px', '718px', '716px', '724px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={20}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-14 */}
      <Tooth
        toothLeftArray={['757px', '774px', '757px', '755px', '764px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={19}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-15 */}
      <Tooth
        toothLeftArray={['798px', '814px', '798px', '796px', '804px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={18}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />
      {/* 3-16 */}
      <Tooth
        toothLeftArray={['837px', '854px', '836px', '835px', '844px']}
        toothTopArray={['427px', '430px', '446px', '430px', '436px']}
        toothNumber={17}
        onAddDiagnosis={onAddDiagnosis}
        hasDignosis={hasDignosis}
        tooths={tooths}
      />

      {/* 17 */}
      <DentalIcon
        img={
          hasDignosis(17, 1)
            ? '/icons/dental-19-1-blue.png'
            : '/icons/dental-19-1.png'
        }
        width="24px"
        height="22px"
        top="472px"
        left="838px"
        onClick={() => onAddDiagnosis({ toothNumber: 17, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(17, 2)
            ? '/icons/dental-19-2-blue.png'
            : '/icons/dental-19-2.png'
        }
        width="20px"
        height="34px"
        top="495px"
        left="841px"
        onClick={() => onAddDiagnosis({ toothNumber: 17, toothPartNumber: 2 })}
      />

      {/* 18 */}
      <DentalIcon
        img={
          hasDignosis(18, 1)
            ? '/icons/dental-19-1-blue.png'
            : '/icons/dental-19-1.png'
        }
        width="25px"
        height="23px"
        top="470px"
        left="798px"
        onClick={() => onAddDiagnosis({ toothNumber: 18, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(18, 2)
            ? '/icons/dental-19-2-blue.png'
            : '/icons/dental-19-2.png'
        }
        width="20px"
        height="38px"
        top="490px"
        left="801px"
        onClick={() => onAddDiagnosis({ toothNumber: 18, toothPartNumber: 2 })}
      />

      {/* 19 */}
      <DentalIcon
        img={
          hasDignosis(19, 1)
            ? '/icons/dental-19-1-blue.png'
            : '/icons/dental-19-1.png'
        }
        width="25px"
        height="24px"
        top="471px"
        left="758px"
        onClick={() => onAddDiagnosis({ toothNumber: 19, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(19, 2)
            ? '/icons/dental-19-2-blue.png'
            : '/icons/dental-19-2.png'
        }
        width="20px"
        height="37px"
        top="491px"
        left="761px"
        onClick={() => onAddDiagnosis({ toothNumber: 19, toothPartNumber: 2 })}
      />

      {/* 20 */}
      <DentalIcon
        img={
          hasDignosis(20, 1)
            ? '/icons/dental-21-1-blue.png'
            : '/icons/dental-21-1.png'
        }
        width="22px"
        height="24px"
        top="470px"
        left="720px"
        onClick={() => onAddDiagnosis({ toothNumber: 20, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(20, 2)
            ? '/icons/dental-21-2-blue.png'
            : '/icons/dental-21-2.png'
        }
        width="17px"
        height="38px"
        top="493px"
        left="723px"
        onClick={() => onAddDiagnosis({ toothNumber: 20, toothPartNumber: 2 })}
      />

      {/* 21 */}
      <DentalIcon
        img={
          hasDignosis(21, 1)
            ? '/icons/dental-21-1-blue.png'
            : '/icons/dental-21-1.png'
        }
        width="21px"
        height="24px"
        top="470px"
        left="681px"
        onClick={() => onAddDiagnosis({ toothNumber: 21, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(21, 2)
            ? '/icons/dental-21-2-blue.png'
            : '/icons/dental-21-2.png'
        }
        width="19px"
        height="38px"
        top="493px"
        left="682px"
        onClick={() => onAddDiagnosis({ toothNumber: 21, toothPartNumber: 2 })}
      />

      {/* 22 */}
      <DentalIcon
        img={
          hasDignosis(22, 1)
            ? '/icons/dental-22-1-blue.png'
            : '/icons/dental-22-1.png'
        }
        width="22px"
        height="27px"
        top="468px"
        left="640px"
        onClick={() => onAddDiagnosis({ toothNumber: 22, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(22, 2)
            ? '/icons/dental-22-2-blue.png'
            : '/icons/dental-22-2.png'
        }
        width="19px"
        height="45px"
        top="491px"
        left="642px"
        onClick={() => onAddDiagnosis({ toothNumber: 22, toothPartNumber: 2 })}
      />

      {/* 23 */}
      <DentalIcon
        img={
          hasDignosis(23, 1)
            ? '/icons/dental-26-1-blue.png'
            : '/icons/dental-26-1.png'
        }
        width="17px"
        height="23px"
        top="467px"
        left="605px"
        onClick={() => onAddDiagnosis({ toothNumber: 23, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(23, 2)
            ? '/icons/dental-26-2-blue.png'
            : '/icons/dental-26-2.png'
        }
        width="17px"
        height="40px"
        top="485px"
        left="605px"
        onClick={() => onAddDiagnosis({ toothNumber: 23, toothPartNumber: 2 })}
      />

      {/* 24 */}
      <DentalIcon
        img={
          hasDignosis(24, 1)
            ? '/icons/dental-26-1-blue.png'
            : '/icons/dental-26-1.png'
        }
        width="18px"
        height="24px"
        top="467px"
        left="564px"
        onClick={() => onAddDiagnosis({ toothNumber: 24, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(24, 2)
            ? '/icons/dental-26-2-blue.png'
            : '/icons/dental-26-2.png'
        }
        width="16px"
        height="39px"
        top="487px"
        left="565px"
        onClick={() => onAddDiagnosis({ toothNumber: 24, toothPartNumber: 2 })}
      />

      {/* 25 */}
      <DentalIcon
        img={
          hasDignosis(25, 1)
            ? '/icons/dental-26-1-blue.png'
            : '/icons/dental-26-1.png'
        }
        width="18px"
        height="24px"
        top="467px"
        left="521px"
        onClick={() => onAddDiagnosis({ toothNumber: 25, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(25, 2)
            ? '/icons/dental-26-2-blue.png'
            : '/icons/dental-26-2.png'
        }
        width="15px"
        height="40px"
        top="487px"
        left="523px"
        onClick={() => onAddDiagnosis({ toothNumber: 25, toothPartNumber: 2 })}
      />

      {/* 26 */}
      <DentalIcon
        img={
          hasDignosis(26, 1)
            ? '/icons/dental-26-1-blue.png'
            : '/icons/dental-26-1.png'
        }
        width="18px"
        height="23px"
        top="467px"
        left="482px"
        onClick={() => onAddDiagnosis({ toothNumber: 26, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(26, 2)
            ? '/icons/dental-26-2-blue.png'
            : '/icons/dental-26-2.png'
        }
        width="16px"
        height="40px"
        top="485px"
        left="483px"
        onClick={() => onAddDiagnosis({ toothNumber: 26, toothPartNumber: 2 })}
      />

      {/* 27 */}
      <DentalIcon
        img={
          hasDignosis(27, 1)
            ? '/icons/dental-27-1-blue.png'
            : '/icons/dental-27-1.png'
        }
        width="21px"
        height="27px"
        top="468px"
        left="442px"
        onClick={() => onAddDiagnosis({ toothNumber: 27, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(27, 2)
            ? '/icons/dental-27-2-blue.png'
            : '/icons/dental-27-2.png'
        }
        width="19px"
        height="45px"
        top="490px"
        left="443px"
        onClick={() => onAddDiagnosis({ toothNumber: 27, toothPartNumber: 2 })}
      />

      {/* 28 */}
      <DentalIcon
        img={
          hasDignosis(28, 1)
            ? '/icons/dental-28-1-blue.png'
            : '/icons/dental-28-1.png'
        }
        width="22px"
        height="24px"
        top="470px"
        left="402px"
        onClick={() => onAddDiagnosis({ toothNumber: 28, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(28, 2)
            ? '/icons/dental-28-2-blue.png'
            : '/icons/dental-28-2.png'
        }
        width="18px"
        height="38px"
        top="493px"
        left="404px"
        onClick={() => onAddDiagnosis({ toothNumber: 28, toothPartNumber: 2 })}
      />

      {/* 29 */}
      <DentalIcon
        img={
          hasDignosis(29, 1)
            ? '/icons/dental-29-1-blue.png'
            : '/icons/dental-29-1.png'
        }
        width="22px"
        height="24px"
        top="470px"
        left="362px"
        onClick={() => onAddDiagnosis({ toothNumber: 29, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(29, 2)
            ? '/icons/dental-29-2-blue.png'
            : '/icons/dental-29-2.png'
        }
        width="18px"
        height="38px"
        top="493px"
        left="364px"
        onClick={() => onAddDiagnosis({ toothNumber: 29, toothPartNumber: 2 })}
      />

      {/* 30 */}
      <DentalIcon
        img={
          hasDignosis(30, 1)
            ? '/icons/dental-30-1-blue.png'
            : '/icons/dental-30-1.png'
        }
        width="26px"
        height="24px"
        top="470px"
        left="321px"
        onClick={() => onAddDiagnosis({ toothNumber: 30, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(30, 2)
            ? '/icons/dental-30-2-blue.png'
            : '/icons/dental-30-2.png'
        }
        width="20px"
        height="35px"
        top="492px"
        left="323px"
        onClick={() => onAddDiagnosis({ toothNumber: 30, toothPartNumber: 2 })}
      />

      {/* 31 */}
      <DentalIcon
        img={
          hasDignosis(31, 1)
            ? '/icons/dental-31-1-blue.png'
            : '/icons/dental-31-1.png'
        }
        width="25px"
        height="22px"
        top="470px"
        left="281px"
        onClick={() => onAddDiagnosis({ toothNumber: 31, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(31, 2)
            ? '/icons/dental-31-2-blue.png'
            : '/icons/dental-31-2.png'
        }
        width="20px"
        height="36px"
        top="493px"
        left="282px"
        onClick={() => onAddDiagnosis({ toothNumber: 31, toothPartNumber: 2 })}
      />

      {/* 32 */}
      <DentalIcon
        img={
          hasDignosis(32, 1)
            ? '/icons/dental-32-1-blue.png'
            : '/icons/dental-32-1.png'
        }
        width="24px"
        height="22px"
        top="472px"
        left="241px"
        onClick={() => onAddDiagnosis({ toothNumber: 32, toothPartNumber: 1 })}
      />
      <DentalIcon
        img={
          hasDignosis(32, 2)
            ? '/icons/dental-32-2-blue.png'
            : '/icons/dental-32-2.png'
        }
        width="20px"
        height="34px"
        top="494px"
        left="242px"
        onClick={() => onAddDiagnosis({ toothNumber: 32, toothPartNumber: 2 })}
      />

      <NumberHeader
        src="/icons/dentalNumberHeader2.png"
        top="546px"
        left="245px"
        width="613px"
        height="19px"
      />
    </Div>
  );
};

export default Dental;
