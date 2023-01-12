import React, {useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import colors from '../../../constants/colors';
import FullPageLoader from '../../full-page-loader';
import Axios from 'axios';
import {backendUrl} from '../../../constants/app';
import {errorHandler, toastMessage} from '../../../helpers';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {fetchSpareParts} from '../../../actions/spareparts';

function SerialNumberItem({item, navigation, index}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const deleteDevice = () => {
    setIsLoading(true);
    Axios.delete(backendUrl + '/spareparts/' + item._id + '?token=' + token)
      .then(res => {
        setIsLoading(false);
        toastMessage('success', res.data.msg);
        dispatch(fetchSpareParts());
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm the process',
      'Do you want to parmanently delete this device? All related data will be removed too.',
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
    <>
      <View
        style={{
          ...flexSpace,
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          alignItems: 'flex-start',
        }}>
        <View>
          <Text>{index + 1}.</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text>{item.sn}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('EditSerialNumber', {item})}
          style={{marginRight: 15}}>
          <View>
            <Icon name="edit" size={30} color={colors.BLUE} />
          </View>
        </Pressable>
        <Pressable onPress={() => handleDelete()}>
          <View>
            <Icon2 name="trash" size={30} color={colors.RED} />
          </View>
        </Pressable>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}

export default SerialNumberItem;
