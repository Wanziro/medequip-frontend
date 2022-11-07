import React, {useEffect, useState} from 'react';
import colors from '../../../constants/colors';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import {errorHandler, toastMessage} from '../../../helpers';
import Axios from 'axios';
import {backendUrl} from '../../../constants/app';
import {setAddDevices, setLoadingDevices} from '../../../actions/devices';
import DeviceItem from './device-item';

function Devices() {
  const dispatch = useDispatch();
  const {devices, isLoading} = useSelector(state => state.devices);
  const {token} = useSelector(state => state.user);
  const fetchDevices = () => {
    dispatch(setLoadingDevices(true));
    Axios.get(backendUrl + '/devices/?token=' + token)
      .then(res => {
        dispatch(setLoadingDevices(false));
        dispatch(setAddDevices(res.data.devices));
      })
      .catch(error => {
        errorHandler(error);
        dispatch(setLoadingDevices(false));
      });
  };
  useEffect(() => {
    fetchDevices();
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        {isLoading && devices.length === 0 ? (
          <Loader />
        ) : (
          <ScrollView>
            {devices.map((item, i) => (
              <DeviceItem item={item} key={i} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default Devices;
