import { memo } from "react";
import { useHistory } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default memo(function Navigator() {
  const history = useHistory();

  return (
    <div className="flex gap-2 sm:gap-3 justify-between text-slate-600">
      <MdArrowBackIos
        className={"text-xl cursor-pointer"}
        onClick={history.goBack}
      />

      <MdArrowForwardIos
        className={"text-xl cursor-pointer"}
        onClick={history.goForward}
      />
    </div>
  );
});
