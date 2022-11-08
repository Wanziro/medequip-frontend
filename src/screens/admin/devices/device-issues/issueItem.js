import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../constants/colors';

function IssueItem({item, navigation}) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.WHITE,
        borderBottomColor: colors.BORDER_COLOR,
        borderBottomWidth: 1,
      }}>
      <Text style={{color: colors.BLACK, fontSize: 18, fontWeight: '500'}}>
        {item.title}
      </Text>
      <Text numberOfLines={2} style={{color: colors.TEXT_COLOR}}>
        {item.summary}
      </Text>
      <Text>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );
}

export default IssueItem;
