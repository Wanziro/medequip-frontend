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
import Axios from 'axios';
import {errorHandler, toastMessage} from '../../../../helpers';
import {backendUrl} from '../../../../constants/app';
import {
  commonAdminButtonContainerStyles,
  commonAdminButtonTextStyles,
  commonInput,
} from '../../../../constants/styles';
import colors from '../../../../constants/colors';
import FullPageLoader from '../../../full-page-loader';
import {setAddSingleDeviceIssue} from '../../../../actions/deviceIssues';

function AddDeviceIssue({navigation, route}) {
  const dispatch = useDispatch();
  const {deviceName, deviceId, categoryName, categoryId} = route.params;
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const handleSubmit = () => {
    if (title.trim() === '' || summary.trim() === '') {
      toastMessage('info', 'All fields can not be empty.');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/deviceissues/add', {
        title,
        summary,
        deviceId,
        categoryId,
        token,
      })
        .then(res => {
          toastMessage('success', res.data.msg);
          dispatch(setAddSingleDeviceIssue(res.data.newIssue));
          setTimeout(() => {
            navigation.goBack();
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
          <View>
            <Text style={{color: colors.BLACK}}>
              {deviceName} / {categoryName} / issues
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter title"
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Short description
            </Text>
            <TextInput
              style={{...commonInput, textAlignVertical: 'top'}}
              placeholder="Summarize the issue"
              multiline={true}
              maxLength={100}
              numberOfLines={4}
              value={summary}
              onChangeText={text => setSummary(text)}
            />
          </View>
          <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
            <View
              style={{
                ...commonAdminButtonContainerStyles,
              }}>
              <Text
                style={{
                  ...commonAdminButtonTextStyles,
                }}>
                {isSubmitting ? 'Saving...' : '  Save'}
              </Text>
            </View>
          </Pressable>
        </View>
        <FullPageLoader isLoading={isSubmitting} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default AddDeviceIssue;
