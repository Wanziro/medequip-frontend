import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../../../constants/colors';
import {flexSpace} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {errorHandler, toastMessage} from '../../../../helpers';
import app from '../../../../constants/app';
import {fetchMessages} from '../../../../actions/messages';
function ChattFooter({user}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const sendMessage = () => {
    if (message.trim() === '') {
      toastMessage('info', 'Please enter your message.');
    } else {
      setIsSendingMessage(true);
      Axios.post(app.backendUrl + '/messages/', {
        token,
        type: 'text',
        to: user._id,
        message,
      })
        .then(res => {
          dispatch(fetchMessages());
          setIsSendingMessage(false);
          setMessage('');
        })
        .catch(error => {
          setIsSendingMessage(false);
          errorHandler(error);
        });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{padding: 15, backgroundColor: colors.BACKGROUND_COLOR}}>
        <View
          style={{
            ...flexSpace,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: colors.LIGHT_BLUE,
            borderRadius: 25,
            alignItems: 'flex-end',
          }}>
          <View style={{padding: 10}}>
            <Icon2 name="attachment" size={20} color={colors.BLACK} />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <TextInput
              multiline
              placeholder="Aa"
              value={message}
              onChangeText={text => setMessage(text)}
              style={{
                padding: 10,
                width: '100%',
                color: colors.BLACK,
                maxHeight: 100,
              }}
            />
          </View>
          <View>
            {isSendingMessage ? (
              <View
                style={{
                  backgroundColor: colors.BLUE,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  borderRadius: 100,
                  opacity: 0.5,
                }}>
                <ActivityIndicator color={colors.WHITE} />
              </View>
            ) : (
              <TouchableOpacity onPress={() => sendMessage()}>
                <View
                  style={{
                    backgroundColor: colors.BLUE,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 100,
                  }}>
                  <Icon name="send" size={20} color={colors.WHITE} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ChattFooter;
