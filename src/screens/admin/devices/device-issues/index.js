import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../constants/colors';
import Loader from '../Loader';

function DeviceIssues({navigation, route}) {
  const {deviceName, deviceId, categoryName, categoryId} = route.params;
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Text style={{color: colors.BLACK, fontSize: 18}}>
          {deviceName} / {categoryName}
        </Text>
        {/* {isLoading && devices.length === 0 ? (
      <Loader />
    ) : (
      <ScrollView>
        {devices.map((item, i) => (
          <DeviceItem item={item} key={i} navigation={navigation} />
        ))}
      </ScrollView>
    )} */}
      </View>
    </>
  );
}

export default DeviceIssues;
