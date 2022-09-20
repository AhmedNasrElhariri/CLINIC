import React from 'react';
import { useHistory } from 'react-router-dom';
import { Div } from 'components';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const iconsClassName = 'text-lg sm:text-xl cursor-pointer';

export default function Navigator() {
  const history = useHistory();

  return (
    <div style={{ direction: 'ltr' }}>
      <Div className="flex gap-1 sm:gap-2 justify-between text-slate-600">
        <MdArrowBackIos className={iconsClassName} onClick={history.goBack} />

        <MdArrowForwardIos
          className={iconsClassName}
          onClick={history.goForward}
        />
      </Div>
    </div>
  );
}
