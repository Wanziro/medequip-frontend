import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSerialNumbers} from '../../../actions/serialNumbers';
import colors from '../../../constants/colors';
import Loader from './Loader';
import SerialNumberItem from './serialNumberItem';

function SerialNumbers({navigation}) {
  const dispatch = useDispatch();
  const {serialNumbers, isLoading} = useSelector(state => state.serialNumbers);
  useEffect(() => {
    dispatch(fetchSerialNumbers());
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        {isLoading && serialNumbers.length === 0 ? (
          <Loader />
        ) : (
          <ScrollView>
            {serialNumbers.map((item, i) => (
              <SerialNumberItem
                index={i}
                item={item}
                key={i}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default SerialNumbers;
