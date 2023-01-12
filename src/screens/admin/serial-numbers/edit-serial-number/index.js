import React from 'react';
import {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
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
import Axios from 'axios';
import {backendUrl} from '../../../../constants/app';
import {errorHandler, toastMessage} from '../../../../helpers';
import {fetchSerialNumbers} from '../../../../actions/serialNumbers';

const initialState = {id: '', sn: ''};
function EditSerialNumber({navigation, route}) {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    setState({
      sn: item.sn,
      id: item._id,
    });
  }, [item]);

  const handleSubmit = () => {
    if (state.sn?.trim() === '') {
      toastMessage('error', 'All fields are required.');
    } else {
      setIsSubmitting(true);
      Axios.put(backendUrl + '/serialnumbers/', {...state, token})
        .then(res => {
          setIsSubmitting(false);
          toastMessage('success', res.data.msg);
          dispatch(fetchSerialNumbers());
          navigation.goBack();
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
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>SN</Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter serial number"
              value={state.sn}
              onChangeText={text => setState({...state, sn: text})}
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

export default EditSerialNumber;
