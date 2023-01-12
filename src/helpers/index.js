import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {resetUser} from '../actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

//custom dispatcher hook
export const useResetUser = () => {
  const dispatch = useDispatch();
  return payload => {
    dispatch(resetUser());
  };
};

export const toastMessage = (type, message) => {
  if (type == 'info') {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'bottom',
    });
  }
  if (type == 'error') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      position: 'bottom',
    });
  }
  if (type == 'success') {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
    });
  }
};

export const errorHandler = error => {
  if (error?.response?.data?.msg) {
    toastMessage('error', error.response.data.msg);
  } else if (error.message) {
    toastMessage('error', error.message);
  } else {
    toastMessage('error', error);
  }
  handleAuthError(error);
};

export const handleAuthError = error => {
  if (error?.response?.status == 401) {
    AsyncStorage.clear();
  }
};

export const getRandomPositionOfAnArray = arraySize => {
  const max = arraySize;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const validateSelectedDevice = (allDevices, index) => {
  try {
    if (index !== '') {
      if (Number(index) < allDevices.length) {
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    console.log(error);
    toastMessage('error', 'Please choose a device');
    return false;
  }
};
