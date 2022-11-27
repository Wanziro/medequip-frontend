import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../../constants/colors';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  commonInput,
} from '../../../../constants/styles';
import {errorHandler, toastMessage} from '../../../../helpers';
import Axios from 'axios';
import {backendUrl} from '../../../../constants/app';
import {setAddSingleDevice} from '../../../../actions/devices';
import {setAddSingleUser} from '../../../../actions/appUsers';
import FullPageLoader from '../../../full-page-loader';

function AddUser({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const handleSubmit = () => {
    if (
      email.trim() === '' ||
      companyName.trim() === '' ||
      emailErrorMessage !== ''
    ) {
      toastMessage('error', 'All fields are required.');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/users/', {email, companyName, token})
        .then(res => {
          toastMessage('success', res.data.msg);
          dispatch(setAddSingleUser(res.data.user));
          setTimeout(() => {
            navigation.navigate('Users');
          }, 1000);
        })
        .catch(error => {
          setIsSubmitting(false);
          errorHandler(error);
        });
    }
  };

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailErrorMessage('Email is Not Correct');
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setEmailErrorMessage('');
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.BACKGROUND_COLOR,
        }}>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Email address
            </Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter user's email address"
              value={email}
              onChangeText={text => validateEmail(text)}
            />
            <Text style={{color: colors.RED}}>{emailErrorMessage}</Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Hospital name
            </Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Ex: CHUK"
              value={companyName}
              onChangeText={text => setCompanyName(text)}
            />
          </View>
          {isSubmitting ? (
            <View
              style={{
                ...commonAdminButtonContainerStyles,
              }}>
              <ActivityIndicator color={colors.WHITE} />
              <Text
                style={{
                  ...commonAdminButtonTextStyles,
                }}>
                Saving User
              </Text>
            </View>
          ) : (
            <Pressable onPress={() => handleSubmit()}>
              <View
                style={{
                  ...commonAdminButtonContainerStyles,
                }}>
                <Text
                  style={{
                    ...commonAdminButtonTextStyles,
                  }}>
                  Save User
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
      <FullPageLoader isLoading={isSubmitting} />
    </KeyboardAwareScrollView>
  );
}

export default AddUser;
