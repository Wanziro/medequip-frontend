import React from 'react';
import {useState} from 'react';
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
import {fetchSpareParts} from '../../../../actions/spareparts';
import {backendUrl} from '../../../../constants/app';
import {errorHandler, toastMessage} from '../../../../helpers';

const initialState = {name: '', model: '', price: ''};
function AddSparePart() {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(initialState);
  const handleSubmit = () => {
    if (
      state.name.trim() === '' ||
      state.price.trim() === '' ||
      state.model.trim() === ''
    ) {
      toastMessage('error', 'All fields are required.');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/spareparts/', {...state, token})
        .then(res => {
          setIsSubmitting(false);
          toastMessage('success', res.data.msg);
          dispatch(fetchSpareParts());
          setState(initialState);
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
              placeholder="Enter spare part name"
              value={state.name}
              onChangeText={text => setState({...state, name: text})}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Model</Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter spare part model"
              value={state.model}
              onChangeText={text => setState({...state, model: text})}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Price (RWF)
            </Text>
            <TextInput
              style={{...commonInput}}
              placeholder="Enter spare part price"
              value={state.price}
              keyboardType="number-pad"
              onChangeText={text => setState({...state, price: text})}
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

export default AddSparePart;
