import React from 'react';
import {useState} from 'react';
import {TextInput, View, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {commonInput} from '../../../../constants/styles';
import FullPageLoader from '../../../full-page-loader';
import Axios from 'axios';
import {errorHandler, toastMessage} from '../../../../helpers';
import {backendUrl} from '../../../../constants/app';
import {useSelector} from 'react-redux';

function EditStepItem({route, navigation}) {
  const {token} = useSelector(state => state.user);
  const {item, fetchStepItems} = route.params;
  const [textDescription, setTextDescription] = useState(item.value);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    if (textDescription.trim() !== '') {
      setIsLoading(true);
      Axios.put(backendUrl + '/troubleshootingSteps/stepItems/', {
        token,
        stepId: item._id,
        value: textDescription,
      })
        .then(res => {
          toastMessage('success', res.data.msg);
          setIsLoading(false);
          navigation.goBack();
          fetchStepItems();
        })
        .catch(error => {
          errorHandler(error);
          setIsLoading(false);
        });
    } else {
      toastMessage('error', 'Please provide description');
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{padding: 10}}>
        <TextInput
          style={{...commonInput, textAlignVertical: 'top'}}
          placeholder="Enter text here"
          multiline={true}
          numberOfLines={12}
          value={textDescription}
          onChangeText={text => setTextDescription(text)}
        />
        <View style={{marginTop: 10}}>
          <Button onPress={() => handleSave()} title="Update" />
        </View>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </KeyboardAwareScrollView>
  );
}

export default EditStepItem;
