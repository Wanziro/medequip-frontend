import React from 'react';
import {useSelector} from 'react-redux';
import LoggedIn from './logged-in';
import NotLoggedIn from './not-logged-in';
import Toast from 'react-native-toast-message';
function Navigation() {
  const {token} = useSelector(state => state.user);
  return (
    <>
      {token === '' || token === undefined ? <NotLoggedIn /> : <LoggedIn />}
      <Toast />
    </>
  );
}

export default Navigation;
