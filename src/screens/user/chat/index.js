import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useDispatch, useSelector} from 'react-redux';
import {silentFetchMessages} from '../../../actions/messages';
import {organiseChattRooms} from '../../../actions/rooms';
import colors from '../../../constants/colors';
import {flexSpace} from '../../../constants/styles';
function Chat({navigation}) {
  const dispatch = useDispatch();
  const {id} = useSelector(state => state.user);
  const {messages} = useSelector(state => state.messages);
  const {chattRooms} = useSelector(state => state.rooms);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(silentFetchMessages());
    }, []),
  );

  useEffect(() => {
    dispatch(organiseChattRooms());
  }, [messages]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        position: 'relative',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chattRooms.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              item.from?._id == id
                ? navigation.navigate('ChattMessages', {user: item.to})
                : navigation.navigate('ChattMessages', {user: item.from});
            }}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                ...flexSpace,
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  backgroundColor: colors.BLUE,
                  borderRadius: 10,
                }}>
                <Icon name="user" color={colors.WHITE} size={30} />
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: colors.BLACK,
                  }}>
                  {item.from._id == id ? item.to.fullName : item.from.fullName}
                </Text>
                <Text numberOfLines={1} style={{color: colors.TEXT_COLOR}}>
                  {item.message}
                </Text>
              </View>
              <View>
                <Text>{new Date(item.date).toLocaleTimeString()}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {/* button */}
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UsersList')}
          style={{
            backgroundColor: colors.BLUE,
            padding: 15,
            borderRadius: 100,
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="plus" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
      {/* button */}
    </View>
  );
}

export default Chat;
