import React, {useEffect, useState} from 'react';
import colors from '../../../constants/colors';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import {fetchDevices} from '../../../actions/devices';
import DeviceItem from './deviceItem';

function Devices({navigation}) {
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
              <DeviceItem item={item} key={i} navigation={navigation} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default Devices;
