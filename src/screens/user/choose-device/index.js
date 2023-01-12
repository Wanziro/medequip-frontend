import React, {useEffect} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchDB} from '../../../actions/db';
import colors from '../../../constants/colors';
import {validateSelectedDevice} from '../../../helpers';
import DeviceItem from './deviceitem';
import Loader from './Loader';

function ChooseDevice({navigation}) {
  const {selectedDevice} = useSelector(state => state.user);
  const db = useSelector(state => state.db);
  useEffect(() => {
    fetchDB();
  }, []);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (db.isLoading) {
          alert('Please wait...');
        } else {
          console.log(selectedDevice);
          if (!validateSelectedDevice(db.db, selectedDevice)) {
            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
              'Warning!',
              'You must choose any device before leaving this page',
              [
                {text: 'OK', style: 'cancel', onPress: () => {}},
                // {
                //   text: 'Discard',
                //   style: 'destructive',
                //   // If the user confirmed, then we dispatch the action we blocked earlier
                //   // This will continue the action that had triggered the removal of the screen
                //   onPress: () => navigation.dispatch(e.data.action),
                // },
              ],
            );
          }
        }
      }),
    [navigation, selectedDevice, db],
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      {db.isLoading ? (
        <Loader />
      ) : (
        <ScrollView>
          {db.db.map((item, i) => (
            <DeviceItem item={item} key={i} index={i} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default ChooseDevice;
