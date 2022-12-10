import React from 'react';
import {View, Text, ScrollView, Dimensions, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../constants/colors';
import {flexCenter} from '../../../../constants/styles';

const {width} = Dimensions.get('window');

function IssueCategories() {
  const {db, isLoading, loadingDbError} = useSelector(state => state.db);
  return (
    <>
      {db.length > 0 && !isLoading && (
        <View style={{marginBottom: 10}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              {db.length > 0 &&
                db[0].troubleShootingCategories.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      ...flexCenter,
                      height: 100,
                      width: width / 2 - 100,
                      padding: 10,
                      backgroundColor: colors.BROWN,
                      borderRadius: 20,
                      marginRight: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.WHITE,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default IssueCategories;
