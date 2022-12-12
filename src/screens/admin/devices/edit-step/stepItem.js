import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {backendUrl, imageUrl} from '../../../../constants/app';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import colors from '../../../../constants/colors';
import {commonInput, flexCenter} from '../../../../constants/styles';
import Axios from 'axios';
import {errorHandler, toastMessage} from '../../../../helpers';

function StepItem({
  item,
  stepItems,
  setStepItems,
  setIsloading,
  token,
  navigation,
  fetchStepItems,
}) {
  const deleteStepItem = () => {
    setIsloading(true);
    Axios.delete(
      backendUrl +
        '/troubleshootingSteps/stepItems/' +
        item._id +
        '?token=' +
        token,
    )
      .then(res => {
        setIsloading(false);
        toastMessage('success', res.data.msg);
        const newItems = stepItems.filter(i => i._id != item._id);
        setStepItems(newItems);
      })
      .catch(error => {
        setIsloading(false);
        errorHandler(error);
      });
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm the process',
      'Do you want to parmanently delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            deleteStepItem();
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View>
      {item.type == 'image' && (
        <View style={{position: 'relative', marginVertical: 10}}>
          <Image
            source={{uri: imageUrl + item.value}}
            style={{
              width: undefined,
              height: undefined,
              aspectRatio: 1,
            }}
          />
          <View style={{position: 'absolute', top: 0, right: 0}}>
            <TouchableOpacity onPress={() => handleDelete()}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.RED,
                  borderRadius: 100,
                  borderColor: colors.BORDER_COLOR,
                }}>
                <Icon name="ios-close" size={25} color={colors.WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {item.type == 'text' && (
        <View style={{position: 'relative', marginVertical: 10}}>
          <Text style={{...commonInput, color: colors.BLACK}}>
            {item.value}
          </Text>
          <View style={{position: 'absolute', top: 0, right: 0}}>
            <View style={{...flexCenter, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditStepItem', {item, fetchStepItems})
                }
                style={{marginRight: 10}}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.BLUE,
                    borderRadius: 100,
                    borderColor: colors.BORDER_COLOR,
                  }}>
                  <Icon2 name="edit" size={25} color={colors.WHITE} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete()}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.RED,
                    borderRadius: 100,
                    borderColor: colors.BORDER_COLOR,
                  }}>
                  <Icon name="ios-close" size={25} color={colors.WHITE} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default StepItem;
