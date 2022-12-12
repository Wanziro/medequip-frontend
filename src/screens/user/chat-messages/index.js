import Reacty, {useEffect} from 'react';
import {Dimensions, View, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {silentFetchMessages} from '../../../actions/messages';
import colors from '../../../constants/colors';
import ChattFooter from './chatt-footer';
import MessagesLoader from './loader';
import MessageItem from './message-item';
const {width, height} = Dimensions.get('window');
function ChattMessages({navigation, route}) {
  const dispatch = useDispatch();
  const {user} = route.params;
  const {messages, isLoading} = useSelector(state => state.messages);
  const {id} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(silentFetchMessages());
  }, []);
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 10,
            paddingBottom: 95,
            backgroundColor: colors.WHITE,
            minHeight: height - 100,
          }}>
          {messages.lenght === 0 && isLoading ? (
            <MessagesLoader />
          ) : (
            messages
              .filter(
                item =>
                  (item.from?._id == id && item.to?._id == user._id) ||
                  (item.from?._id == user._id && item.to?._id == id),
              )
              .map((item, index) => (
                <MessageItem key={index} item={item} userId={id} />
              ))
          )}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width}}>
        <ChattFooter user={user} />
      </View>
    </View>
  );
}

export default ChattMessages;
