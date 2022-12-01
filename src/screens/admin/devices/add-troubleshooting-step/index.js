import React, {useState} from 'react';
import {Text, TextInput, View, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../../../constants/colors';
import {commonInput} from '../../../../constants/styles';
import {errorHandler, toastMessage} from '../../../../helpers';
import FullPageLoader from '../../../full-page-loader';
import Header from './header';
import Axios from 'axios';
import {backendUrl} from '../../../../constants/app';
import {useSelector} from 'react-redux';
import {uploadImage} from '../../../../helpers/fileUploads';

function AddTroubleshootingStep({navigation, route}) {
  const {token} = useSelector(state => state.user);
  const [isLoading, setIsloading] = useState(false);
  const {deviceName, deviceId, categoryName, categoryId, issueId, issueTitle} =
    route.params;
  const [title, setTitle] = useState('');
  const [disableTextButton, setDisableTextButton] = useState(false);
  const [disableImageButton, setDisableImageButton] = useState(false);
  const [textDescription, setTextDescription] = useState('');
  const [selectedImage, setSelecteImage] = useState(null);

  const handleSubmit = async () => {
    if (title.trim() === '') {
      toastMessage('error', 'Title is required');
    } else if (selectedImage === null && textDescription === '') {
      toastMessage('error', 'Please add text or image');
    } else {
      setIsloading(true);
      try {
        const step = await Axios.post(backendUrl + '/troubleshootingSteps/', {
          title,
          deviceId,
          categoryId,
          issueId,
          token,
        });
        // console.log(step.data);
        if (selectedImage !== null) {
          const {status, fileName} = await uploadImage(selectedImage);
          if (status == 'success') {
            await Axios.post(backendUrl + '/troubleshootingSteps/stepItems/', {
              type: 'image',
              value: fileName,
              stepId: step.data.step._id,
              token,
            });
          }
        }
        if (textDescription.trim() !== '') {
          await Axios.post(backendUrl + '/troubleshootingSteps/stepItems/', {
            type: 'text',
            value: textDescription,
            stepId: step.data.step._id,
            token,
          });
        }
        setIsloading(false);
        navigation.navigate('TroubleshootingSteps', {
          deviceName,
          deviceId,
          categoryName,
          categoryId,
          issueId,
          issueTitle,
        });
      } catch (error) {
        setIsloading(false);
        errorHandler(error);
      }
    }
  };

  const handleImageSelect = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setSelecteImage(results);
      setDisableImageButton(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <>
      <Header
        navigation={navigation}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        setDisableTextButton={setDisableTextButton}
        disableTextButton={disableTextButton}
      />
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
                {deviceName} / {categoryName} / {issueTitle}
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
            {disableImageButton && selectedImage !== null && (
              <Image
                source={{uri: selectedImage.uri}}
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  marginVertical: 10,
                }}
              />
            )}
            {disableTextButton && (
              <View style={{marginVertical: 10}}>
                <TextInput
                  style={{...commonInput, textAlignVertical: 'top'}}
                  placeholder="Enter text here"
                  multiline={true}
                  numberOfLines={12}
                  value={textDescription}
                  onChangeText={text => setTextDescription(text)}
                />
              </View>
            )}
          </View>
          <FullPageLoader isLoading={isLoading} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

export default AddTroubleshootingStep;
