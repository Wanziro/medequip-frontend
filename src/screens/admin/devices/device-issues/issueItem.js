import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../../../constants/colors';

function IssueItem({
  item,
  navigation,
  deviceName,
  deviceId,
  categoryName,
  categoryId,
}) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.WHITE,
        borderBottomColor: colors.BORDER_COLOR,
        borderBottomWidth: 1,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TroubleshootingSteps', {
            deviceName,
            deviceId,
            categoryName,
            categoryId,
            issueId: item._id,
            issueTitle: item.title,
          })
        }>
        <Text style={{color: colors.BLACK, fontSize: 18, fontWeight: '500'}}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={{color: colors.TEXT_COLOR}}>
          {item.summary}
        </Text>
        <Text>{new Date(item.createdAt).toLocaleString()}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default IssueItem;
