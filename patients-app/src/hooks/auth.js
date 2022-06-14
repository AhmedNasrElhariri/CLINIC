import React, { useMemo, useEffect } from "react";
import useGlobalState from "../services/state";
import { useMutation } from "@apollo/client";
import { VERIFY } from "../apollo-client/queries";
import * as ls from "../services/local-storage";

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useGlobalState("isAuthenticated");
  const [isVerified, setVerified] = useGlobalState("isVerified");
  const [verify] = useMutation(VERIFY, {
    fetchPolicy: "no-cache",
    onCompleted({ organizationId }) {
      setAuthenticated(true);
      setVerified(true);
    },
    onError() {
      setVerified(true);
    },
  });

  useEffect(() => {
    verify({ variables: { token: ls.getToken(ls.ACCESS_TOKEN) } });
  }, [verify]);
  return useMemo(
    () => ({ isAuthenticated, setAuthenticated, isVerified }),
    [isAuthenticated, setAuthenticated, isVerified]
  );
};

export default useAuth;
