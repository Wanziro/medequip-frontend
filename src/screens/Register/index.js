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
// import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {useDispatch} from 'react-redux';
const {width} = Dimensions.get('window');
function Register({navigation}) {
  const dispatch = useDispatch();
  const [names, setNames] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneRef = useRef(null);
  const validPhoneCode = ['8', '9', '2', '3'];

  useEffect(() => {
    // dispatch(resetCurrentUser());
  }, []);

  const handleSubmit = () => {
    if (
      names.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      alert(
        'Please all information on this form are required. Kindly provide them carefully.',
      );
      return;
    }
    if (password.length <= 4) {
      alert('Password must be greater then 4 characters');
      return;
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    //validate phone
    if (phone.trim() === '') {
      alert('Please enter your phone number');
      return;
    } else if (
      !validPhoneCode.includes(phone[2]) ||
      phone[0] !== '0' ||
      phone[1] !== '7' ||
      phone.length !== 10
    ) {
      alert(
        'Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.',
      );
      return;
    }

    setIsSubmitting(true);
    // Axios.post(backendUrl + '/register', {name: names, phone, email, password})
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.data.type == 'success') {
    //       alert(res.data.msg);
    //       const {id, name, phone, email} = res.data.user;
    //       dispatch(setCurrentUserId(id));
    //       dispatch(setCurrentUserNames(name));
    //       dispatch(setCurrentUserEmail(email));
    //       dispatch(setCurrentUserPhone(phone));
    //       setIsSubmitting(false);
    //       navigation.replace('HomeTabs1');
    //     } else {
    //       setPassword('');
    //       setConfirmPassword('');
    //       alert(res.data.msg);
    //       setIsSubmitting(false);
    //     }
    //   })
    //   .catch(error => {
    //     setIsSubmitting(false);
    //     setPassword('');
    //     alert(error.message);
    //   });
  };

  return (
    <KeyboardAwareScrollView>
      <StatusBar backgroundColor={colors.BROWN} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.BACKGROUND_COLOR,
        }}>
        <View
          style={{
            backgroundColor: colors.BROWN,
            padding: 10,
            height: 50,
            width: '100%',
            borderBottomEndRadius: 80,
            // borderBottomStartRadius: 80,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', bottom: -70, width}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: colors.BACKGROUND_COLOR,
                  borderRadius: 100,
                  padding: 10,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 100, height: 100}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Names</Text>
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
                backgroundColor: colors.BROWN,
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
                  backgroundColor: colors.BROWN,
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center', color: colors.OXFORD_BLUE}}>
                Already have account? Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Register;
