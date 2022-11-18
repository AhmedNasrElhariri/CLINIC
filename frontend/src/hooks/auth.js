import { useEffect } from "react";
import { VERIFY } from "apollo-client/queries";
import { useMutation } from "@apollo/client";
import { useAbility } from "@casl/react";
import { POSITIONS } from "../utils/constants";
import useGlobalState from "state";
import { AbilityContext } from "components/user/can";
import { getToken } from "services/local-storage";

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useGlobalState("isAuthenticated");
  const [isVerified, setVerified] = useGlobalState("isVerified");
  const [user, setUser] = useGlobalState("user");
  const ability = useAbility(AbilityContext);

  const updatePermissions = (user) => {
    let permissions;
    if (user.position === "Admin") {
      permissions = [
        {
          action: "manage",
          subject: "all",
        },
      ];
    } else {
      permissions = [...user.role.permissions];
    }
    ability.update(permissions);
  };

  const [verify] = useMutation(VERIFY, {
    fetchPolicy: "no-cache",
    onCompleted({ verify: user }) {
      setAuthenticated(true);
      setUser(user);
      updatePermissions(user);
      setVerified(true);
    },
    onError() {
      setVerified(true);
    },
  });

  useEffect(() => {
    verify({ variables: { token: getToken() } });
  }, [verify]);

  return {
    isAuthenticated,
    isVerified,
    user,
    setAuthenticated,
    updatePermissions,
    isAdmin: user && user.position === POSITIONS.ADMIN,
    isOrAssistant:
      user &&
      (user.position === POSITIONS.ADMIN ||
        user.position === POSITIONS.ASSISTANT),
    can: (action, subject) => ability.can(action, subject),
  };
};

export default useAuth;
