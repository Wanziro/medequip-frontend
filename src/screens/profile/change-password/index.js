import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {backendUrl} from '../../../constants/app';
import {errorHandler, toastMessage} from '../../../helpers';
import FullPageLoader from '../../full-page-loader';

function ChangePassword({navigation}) {
  const userObj = useSelector(state => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newPasswordRef = useRef(null);

  const handleSubmit = () => {
    if (
      newPassword.trim() === '' &&
      currentPassword.trim() === '' &&
      confirmPassword.trim() === ''
    ) {
      toastMessage('error', 'All fields are required');
    } else if (newPassword.length <= 4) {
      toastMessage('info', 'Password must be more than 4 characters');
      newPasswordRef.current.focus();
    } else if (newPassword !== confirmPassword) {
      toastMessage('error', 'Passwords do not match');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/users/updatePassword/', {
        token: userObj.token,
        currentPwd: currentPassword,
        newPwd: newPassword,
      })
        .then(res => {
          setIsSubmitting(false);
          toastMessage('success', res.data.msg);
          navigation.navigate('Home');
        })
        .catch(error => {
          setIsSubmitting(false);
          errorHandler(error);
        });
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.RED} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 15,
        }}>
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="Current password"
          secureTextEntry
          onChangeText={text => setCurrentPassword(text)}
        />
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="New password"
          secureTextEntry
          ref={newPasswordRef}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="New password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
          <View
            style={{
              backgroundColor: colors.RED,
              padding: 15,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            {isSubmitting && (
              <ActivityIndicator color={colors.WHITE} size={20} />
            )}
            <Text style={{color: colors.WHITE, textAlign: 'center'}}>
              Update password
            </Text>
          </View>
        </Pressable>
        <FullPageLoader isLoading={isSubmitting} />
      </View>
    </>
  );
}

export default ChangePassword;
