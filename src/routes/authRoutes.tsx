import { Route } from "react-router-dom";
import Register from "@pages/Auth/Register";
import RegisterConfirmation from "@pages/Auth/Register/components/Confirmation";
import SetPassword from "@pages/Auth/Register/components/SetPassword";
import TwoFactorAuthentication from "@pages/Auth/Register/components/2FactorAuthentication";
import RegisterSuccess from "@pages/Auth/Register/components/Success";
import Invite from "@pages/Auth/Invite";
import InviteConfirmation from "@pages/Auth/Invite/components/Confirmation";
import InviteSetPassword from "@pages/Auth/Invite/components/SetPassword";
import InviteTwoFactorAuthentication from "@pages/Auth/Invite/components/2FactorAuthentication";
import InviteSuccess from "@pages/Auth/Invite/components/Success";
import Login from "@pages/Auth/Login";
import LoginConfirmation from "@pages/Auth/Login/LoginConfirmation";
import ForgotPassword from "@pages/Auth/ForgotPassword";
import ResetPassword from "@pages/Auth/ResetPassword";
import ResetPasswordSuccess from "@pages/Auth/ResetPassword/Success";

const AuthRoutes = () => (
  <>
    <Route path="register-success" element={<RegisterSuccess />} />
    <Route path="invite-success" element={<InviteSuccess />} />
    <Route path="register" element={<Register />} />
    <Route path="register/confirmation" element={<RegisterConfirmation />} />
    <Route path="register/set-password" element={<SetPassword />} />
    <Route path="register/2fa" element={<TwoFactorAuthentication />} />
    <Route path="invite" element={<Invite />} />
    <Route path="invite/confirmation" element={<InviteConfirmation />} />
    <Route path="invite/set-password" element={<InviteSetPassword />} />
    <Route path="invite/2fa" element={<InviteTwoFactorAuthentication />} />
    <Route path="login/confirmation" element={<LoginConfirmation />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
    <Route path="reset-password/success" element={<ResetPasswordSuccess />} />
    <Route index element={<Login />} />
    <Route path="login" element={<Login />} />
  </>
);

export default AuthRoutes;
