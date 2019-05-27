import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{paddingTop:30}}>
        <Text>Hello there</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  
});
