import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const RefTCreateComponent = () => {
  const { organizationId } = useParams();
  const history = useNavigate();
  useEffect(() => {
    history(`/create-appointment/${organizationId}`);
  }, []);
  return <></>;
};
export default RefTCreateComponent;
