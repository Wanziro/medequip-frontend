import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Pressable, Text} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {flexSpace} from '../../../constants/styles';

function IssuesPerCategory({navigation, route}) {
  const {categoryId, deviceId, categoryName} = route.params;
  const {db} = useSelector(state => state.db);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(db.filter(item => item._id == deviceId));
  }, [categoryId, deviceId, categoryName]);
  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {results.length > 0 &&
          results[0].deviceIssues.map(
            (item, index) =>
              item.categoryId == categoryId && (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('IssueSteps', {
                      issueId: item._id,
                      deviceId: item.deviceId,
                    })
                  }>
                  <View style={styles.container}>
                    <View style={{...flexSpace}}>
                      <View style={{flex: 1, marginRight: 10}}>
                        <Text
                          style={{
                            color: colors.BLACK,
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: colors.TEXT_COLOR,
                            opacity: 0.8,
                          }}>
                          {item.summary}
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 100,
                          borderColor: colors.BLACK,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                        }}>
                        <Text
                          style={{
                            color: colors.BLACK,
                          }}>
                          {
                            db[0].troubleshootingSteps.filter(
                              i => i.issueId == item._id,
                            ).length
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ),
          )}
      </ScrollView>
    </View>
  );
}

export default IssuesPerCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
});
