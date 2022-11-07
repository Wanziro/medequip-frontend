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

function AddDevice({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const handleSubmit = () => {
    if (deviceName.trim() === '') {
      toastMessage('error', 'Device name can not be empty.');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/devices/add', {name: deviceName, token})
        .then(res => {
          toastMessage('success', res.data.msg);
          dispatch(setAddSingleDevice(res.data.device));
          setTimeout(() => {
            navigation.navigate('Devices');
          }, 1000);
        })
        .catch(error => {
          setIsSubmitting(false);
          errorHandler(error);
        });
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
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Name</Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter device name"
              value={deviceName}
              onChangeText={text => setDeviceName(text)}
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
                Saving
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
                  Save
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default AddDevice;
