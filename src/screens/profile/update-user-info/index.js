import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {backendUrl} from '../../../constants/app';
import {errorHandler, toastMessage} from '../../../helpers';
import {setUserNames} from '../../../actions/user';
import FullPageLoader from '../../full-page-loader';

const {width} = Dimensions.get('window');
function UpdateUserInfo({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [names, setNames] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = () => {
    if (names.trim() !== '') {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/users/updateUserInfo/', {
        fullName: names,
        token: user.token,
      })
        .then(res => {
          setIsSubmitting(false);
          dispatch(setUserNames(names));
          toastMessage('success', res.data.msg);
          navigation.navigate('Profile');
        })
        .catch(error => {
          setIsSubmitting(false);
          errorHandler(error);
        });
    } else {
      toastMessage('error', 'All fields are required');
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.BLUE} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Names</Text>
            <TextInput
              style={styles.input}
              value={names}
              onChangeText={text => setNames(text)}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputDesabled}>
              <Text>{email}</Text>
            </View>
          </View>

          <View style={{marginVertical: 10}}>
            <View style={{marginVertical: 10}}>
              <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
                <View
                  style={{
                    padding: 15,
                    borderRadius: 5,
                    backgroundColor: colors.BLUE,
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {isSubmitting && (
                    <ActivityIndicator color={colors.WHITE} size={25} />
                  )}
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.WHITE,
                      fontSize: 16,
                    }}>
                    Submit info
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <FullPageLoader isLoading={isSubmitting} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
  },
  inputDesabled: {
    padding: 10,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.BG_GRAY,
  },
  label: {
    color: colors.MENU,
    marginBottom: 5,
  },
});

export default UpdateUserInfo;
