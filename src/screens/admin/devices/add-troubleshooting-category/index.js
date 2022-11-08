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
import {setAddSingleTroubleShootingCategory} from '../../../../actions/troubleShootingCategories';

function AddTroubleShootingCategory({navigation, route}) {
  const dispatch = useDispatch();
  const {deviceName, deviceId} = route.params;
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const handleSubmit = () => {
    if (categoryName.trim() === '') {
      toastMessage('error', 'Category name can not be empty.');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/troubleshootingCategories/add', {
        name: categoryName,
        deviceId,
        token,
      })
        .then(res => {
          toastMessage('success', res.data.msg);
          dispatch(setAddSingleTroubleShootingCategory(res.data.newCategory));
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
              Devices / {deviceName} / New troubleshooting category
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter category name"
              value={categoryName}
              onChangeText={text => setCategoryName(text)}
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

export default AddTroubleShootingCategory;
