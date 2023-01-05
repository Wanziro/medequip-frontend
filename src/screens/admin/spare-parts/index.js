import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpareParts} from '../../../actions/spareparts';
import colors from '../../../constants/colors';
import Loader from './Loader';
import SparePartItem from './sparepart-item';

function SpareParts({navigation}) {
  const dispatch = useDispatch();
  const {spareparts, isLoading} = useSelector(state => state.spareparts);
  useEffect(() => {
    dispatch(fetchSpareParts());
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
        {isLoading && spareparts.length === 0 ? (
          <Loader />
        ) : (
          <ScrollView>
            {spareparts.map((item, i) => (
              <SparePartItem item={item} key={i} navigation={navigation} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default SpareParts;
