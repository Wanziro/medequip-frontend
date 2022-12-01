import React from 'react';
import {useSelector} from 'react-redux';
import NotLoggedIn from './not-logged-in';
import Toast from 'react-native-toast-message';
import UserRoutes from './logged-in/user-routes';
import AdminRoutes from './logged-in/admin-routes';
function Navigation() {
  const {token, role} = useSelector(state => state.user);
  return (
    <>
      {token === '' || token === undefined ? (
        <NotLoggedIn />
      ) : role == 'user' ? (
        <UserRoutes />
      ) : (
        <AdminRoutes />
      )}
      <Toast />
    </>
  );
}

export default Navigation;
