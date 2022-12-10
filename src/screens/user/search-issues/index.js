import React, {useEffect, useState} from 'react';
import {Pressable, View, StyleSheet, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {flexSpace} from '../../../constants/styles';

function SearchIssues({navigation}) {
  const {db} = useSelector(state => state.db);
  const {issueKeyword} = useSelector(state => state.keywords);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let res = [];
    for (let i = 0; i < db.length; i++) {
      const issues = db[i].deviceIssues;
      const val = issues.filter(
        item =>
          item.title.toLowerCase().includes(issueKeyword.toLowerCase()) ||
          item.summary.toLowerCase().includes(issueKeyword.toLowerCase()),
      );
      if (val.length > 0) {
        res = [...res, ...val];
      }
    }
    setResults(res);
  }, [issueKeyword]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {db.length > 0 && issueKeyword.trim() === ''
          ? db[0].deviceIssues.map((item, index) => (
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
            ))
          : results.map((item, index) => (
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
            ))}
      </ScrollView>
    </View>
  );
}

export default SearchIssues;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
});
