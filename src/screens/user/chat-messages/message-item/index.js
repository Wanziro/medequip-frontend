import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../constants/colors';

function MessageItem({item, userId}) {
  return (
    <>
      {item.from?._id == userId ? (
        <View
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text>{new Date(item.date).toLocaleTimeString()}</Text>
            <View>
              <View
                style={{
                  backgroundColor: colors.BLUE,
                  marginLeft: 10,
                  padding: 15,
                  borderRadius: 20,
                  borderBottomRightRadius: 0,
                }}>
                <Text style={{color: colors.WHITE}}>{item.message}</Text>
              </View>
              <Text style={{textAlign: 'right'}}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginVertical: 10,
            }}>
            <View>
              <View
                style={{
                  backgroundColor: colors.LIGHT_BLUE,
                  marginRight: 10,
                  padding: 15,
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                }}>
                <Text style={{color: colors.BLACK}}>{item.message}</Text>
              </View>
              <Text>{new Date(item.date).toLocaleTimeString()}</Text>
            </View>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        </View>
      )}
    </>
  );
}

export default MessageItem;
