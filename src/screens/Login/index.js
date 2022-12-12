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
import {backendUrl} from '../../constants/app';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {errorHandler, toastMessage} from '../../helpers';
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
function Login({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    setIsSubmitting(true);
    if (email.trim() === '' || password.trim() === '') {
      emailRef.current.focus();
      setIsSubmitting(false);
    } else {
      Axios.post(backendUrl + '/users/login/', {email, password})
        .then(res => {
          const {email, fullName, companyName, role, id, token} = res.data;
          dispatch(setUserEmail(email));
          dispatch(setUserNames(fullName));
          dispatch(setUserCompanyName(companyName));
          dispatch(setUserId(id));
          dispatch(setUserRole(role));
          dispatch(setUserToken(token));
          toastMessage('success', 'Logged in successfull');
        })
        .catch(error => {
          setIsSubmitting(false);
          setPassword('');
          errorHandler(error);
        });
    }
  };
  useEffect(() => {
    dispatch(resetUser());
  }, []);
  return (
    <KeyboardAwareScrollView>
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
            height: 150,
            width: '100%',
            // borderBottomEndRadius: 80,
            // borderBottomStartRadius: 80,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', bottom: -70, width}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: colors.BACKGROUND_COLOR,
                  borderRadius: 10,
                  // padding: 10,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 150, height: 150, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 80}}>
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.BROWN,
              textAlign: 'center',
            }}>
            Login
          </Text> */}
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Email</Text>
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
              ref={emailRef}
              value={email}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Password</Text>
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
                Login
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
                  Login
                </Text>
              </View>
            </Pressable>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center', color: colors.OXFORD_BLUE}}>
                Don't have account? Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
