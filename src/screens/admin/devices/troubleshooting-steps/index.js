import React from 'react';
import {View, Text} from 'react-native';

function TroubleshootingSteps({navigation, route}) {
  const {deviceName, deviceId, categoryName, categoryId} = route.params;
  return (
    <View>
      <Text>TroubleshootingSteps</Text>
    </View>
  );
}

export default TroubleshootingSteps;
