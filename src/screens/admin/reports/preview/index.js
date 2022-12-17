import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

function Preview({route}) {
  const {filePath} = route.params;
  return (
    <>
      {filePath && (
        <Pdf
          source={{
            uri: filePath,
          }}
          style={styles.pdf}
        />
      )}
    </>
  );
}

export default Preview;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
