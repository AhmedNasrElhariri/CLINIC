import { Route, Redirect } from "react-router-dom";
import * as R from "ramda";
import UserAllowedViewsContext from "../../../services/allowed-views-context";
import useGlobalState from "state";
import { AppRouter, NewPatient } from "components";
import NewAppointment from "components/appointments/new-appointment";
import useUserProfile from "./fetch-user";
import { useModal } from "hooks";
import { useTranslation } from "react-i18next";
import LoginView from "features/auth/LoginView";
import AppLayout from "features/root/app-layout/AppLayout";
import { ModalsContext } from "common/contexts/ModalsContext";

function Root() {
  const { visible: visbleAppointment, toggle: toggleAppointment } = useModal();
  const { visible: visblePatient, toggle: togglePatient } = useModal();
  const { t } = useTranslation();

  const {
    onLoginFailed,
    onLoginSucceeded,
    logout,
    isVerified,
    isAuthenticated,
    user: User,
  } = useUserProfile();

  const [user] = useGlobalState("user");
  const allowedViews = R.propOr([], "allowedViews")(user);

  if (!isVerified) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div>
      <UserAllowedViewsContext.Provider value={allowedViews}>
        {isAuthenticated ? (
          <ModalsContext.Provider
            value={{
              toggleAddAppointment: toggleAppointment,
              toggleAddPatient: togglePatient,
            }}
          >
            <AppLayout onLogout={logout} user={User}>
              <AppRouter></AppRouter>
            </AppLayout>
            <NewPatient show={visblePatient} onHide={togglePatient} />
            <NewAppointment
              show={visbleAppointment}
              onHide={toggleAppointment}
            />
          </ModalsContext.Provider>
        ) : (
          <>
            <Route path="/login">
              <LoginView
                onLoginSucceeded={onLoginSucceeded}
                onLoginFailed={onLoginFailed}
              />
            </Route>
            <Redirect to="/login"></Redirect>
          </>
        )}
      </UserAllowedViewsContext.Provider>
    </div>
  );
}

export default Root;
