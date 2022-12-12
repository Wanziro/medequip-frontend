import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import Axios from 'axios';
import app, {backendUrl} from '../../constants/app';
import {useDispatch} from 'react-redux';
import FullPageLoader from '../full-page-loader';
import {toastMessage, errorHandler} from '../../helpers';
import {
  resetUser,
  setUserCompanyName,
  setUserEmail,
  setUserId,
  setUserNames,
  setUserRole,
  setUserToken,
} from '../../actions/user';
const {width} = Dimensions.get('window');
function Register({navigation}) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  const handleSubmit = () => {
    if (
      names.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      toastMessage(
        'error',
        'Please all information on this form are required. Kindly provide them carefully.',
      );
      return;
    }
    if (password.length <= 4) {
      toastMessage('error', 'Password must be greater then 4 characters');
      return;
    } else if (password !== confirmPassword) {
      toastMessage('error', 'Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    Axios.post(backendUrl + '/users/register', {
      fullName: names,
      email,
      otp,
      password,
    })
      .then(res => {
        setIsSubmitting(false);
        const {email, fullName, companyName, role, id, token} = res.data;
        dispatch(setUserEmail(email));
        dispatch(setUserNames(fullName));
        dispatch(setUserCompanyName(companyName));
        dispatch(setUserId(id));
        dispatch(setUserRole(role));
        dispatch(setUserToken(token));
        // navigation.replace('HomeTabs1');
        toastMessage('success', res.data.msg);
      })
      .catch(error => {
        setIsSubmitting(false);
        setPassword('');
        setConfirmPassword('');
        errorHandler(error);
      });
  };

  const handleVerifyOtp = () => {
    if (email.trim() === '' && otp.trim() === '') {
      toastMessage('error', 'All fields are required');
    } else {
      setIsSubmitting(true);
      Axios.post(app.backendUrl + '/users/otp/', {email, otp})
        .then(res => {
          toastMessage('success', res.data.msg);
          setOtpValidated(true);
          setIsSubmitting(false);
        })
        .catch(error => {
          errorHandler(error);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: colors.BACKGROUND_COLOR,
      }}>
      <StatusBar backgroundColor={colors.BLUE} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.BACKGROUND_COLOR,
        }}>
        <View
          style={{
            backgroundColor: colors.BLUE,
            padding: 10,
            height: 50,
            width: '100%',
            // borderBottomEndRadius: 80,
            // borderBottomStartRadius: 80,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', bottom: -50, width}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: colors.BACKGROUND_COLOR,
                  borderRadius: 10,
                  // padding: 10,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 90, height: 90, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          {otpValidated ? (
            <>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
                  Names
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.WHITE,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}
                  placeholder="Enter your full names"
                  onChangeText={text => setNames(text)}
                  value={names}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
                  Email
                </Text>
                <Text
                  style={{
                    backgroundColor: '#CCC',
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}>
                  {email}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
                  Password
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.WHITE,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}
                  secureTextEntry
                  placeholder="Enter your password"
                  onChangeText={text => setPassword(text)}
                  value={password}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
                  Confirm password
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.WHITE,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}
                  secureTextEntry
                  placeholder="Confirm password"
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                />
              </View>
              {isSubmitting ? (
                <View
                  style={{
                    backgroundColor: colors.BLUE,
                    padding: 15,
                    marginTop: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <ActivityIndicator color={colors.WHITE} />
                  <Text
                    style={{
                      color: colors.WHITE,
                      textAlign: 'center',
                      fontSize: 18,
                      marginLeft: 10,
                    }}>
                    Registering
                  </Text>
                </View>
              ) : (
                <Pressable onPress={() => handleSubmit()}>
                  <View
                    style={{
                      backgroundColor: colors.BLUE,
                      padding: 15,
                      marginTop: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.WHITE,
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      Register
                    </Text>
                  </View>
                </Pressable>
              )}
            </>
          ) : (
            <>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
                  Email
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.WHITE,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}
                  placeholder="Email address"
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>OTP</Text>
                <TextInput
                  style={{
                    backgroundColor: colors.WHITE,
                    marginTop: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.BORDER_COLOR,
                  }}
                  secureTextEntry
                  placeholder="Enter your OTP"
                  onChangeText={text => setOtp(text)}
                  keyboardType="number-pad"
                  value={otp}
                />
              </View>

              <Pressable onPress={() => handleVerifyOtp()}>
                <View
                  style={{
                    backgroundColor: colors.BLUE,
                    padding: 15,
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: colors.WHITE,
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Velify OTP
                  </Text>
                </View>
              </Pressable>
            </>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center', color: colors.OXFORD_BLUE}}>
                Already have account? Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FullPageLoader isLoading={isSubmitting} />
    </KeyboardAwareScrollView>
  );
}

export default Register;
