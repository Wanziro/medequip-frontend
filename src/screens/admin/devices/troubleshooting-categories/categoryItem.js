import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable, Alert} from 'react-native';
import colors from '../../../../constants/colors';
import {
  errorHandler,
  getRandomPositionOfAnArray,
  toastMessage,
} from '../../../../helpers';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {backendUrl} from '../../../../constants/app';
import {fetchTroubleshootingcategories} from '../../../../actions/troubleShootingCategories';

const commonStyles = {
  backgroundColor: colors.WHITE,
  width: '50%',
  borderRadius: 5,
  marginBottom: 20,
  padding: 10,
  borderLeftWidth: 5,
};
function CategoryItem({item, setIsLoading}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [borderColor, setBorderColor] = useState('');
  useEffect(() => {
    setBorderColor(
      colors.randomColors[
        getRandomPositionOfAnArray(colors.randomColors.length)
      ],
    );
  }, []);

  const deleteDevice = () => {
    setIsLoading(true);
    Axios.post(backendUrl + '/troubleshootingCategories/remove', {
      token,
      id: item.item._id,
    })
      .then(res => {
        setIsLoading(false);
        toastMessage('success', res.data.msg);
        dispatch(fetchTroubleshootingcategories());
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm the process',
      'Do you want to parmanently delete this category? All related data will be removed too.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            deleteDevice();
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View
      style={
        item.index % 2 === 0
          ? {...commonStyles, marginRight: 10, borderLeftColor: borderColor}
          : {...commonStyles, marginLeft: 10, borderLeftColor: borderColor}
      }>
      <Pressable onLongPress={() => handleDelete()}>
        <Text style={{color: colors.BLACK}}>{item.item.name}</Text>
        <Text
          style={{
            color: borderColor,
            fontWeight: '500',
            fontSize: 16,
            marginTop: 10,
          }}>
          0 Items
        </Text>
      </Pressable>
    </View>
  );
}

export default CategoryItem;
