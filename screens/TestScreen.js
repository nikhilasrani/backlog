import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button
} from 'react-native';
import * as firebase from "firebase"
export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onSignoutPress = () => {
    firebase.auth().signOut()
    .then(()=> {
      this.setState({isAuthenticated: false})
      this.props.navigation.navigate("Auth")})
  }
  render() {
    return (
      <View style={{paddingTop:30}}>
        <Text>Hello there</Text>
        <Button title="Signout" onPress={this.onSignoutPress}/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  
});
