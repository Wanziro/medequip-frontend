import React, {useEffect, useState} from 'react';
import colors from '../../../constants/colors';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import {errorHandler, toastMessage} from '../../../helpers';
import Axios from 'axios';
import {backendUrl} from '../../../constants/app';
import {
  fetchDevices,
  setAddDevices,
  setLoadingDevices,
} from '../../../actions/devices';
import DeviceItem from './device-item';

function Devices() {
  const dispatch = useDispatch();
  const {devices, isLoading} = useSelector(state => state.devices);
  useEffect(() => {
    dispatch(fetchDevices());
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
