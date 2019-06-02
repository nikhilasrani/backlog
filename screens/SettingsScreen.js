import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from "firebase"
import window from "../constants/Layout"
export default class Settings extends React.Component {
  static navigationOptions = {
   // header: null,
    headerTitle:"Settings"
  };

  onSignoutPress = () => {
    firebase.auth().signOut()
    .then(()=> {
      this.setState({isAuthenticated: false})
      this.props.navigation.navigate("Auth")})
  }
  render() {
    return (
      <View style={{flex:1,paddingTop:30, alignItems:"center", backgroundColor:"#fff"}}>
        <Text style={{fontFamily:'open-sans'}}>Click on the sign out button to sign out</Text>
        <View style={{paddingTop:25}}></View>
        <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSignoutPress}  >
                    <Text style={styles.loginButtonText}>Signout</Text>
                    </TouchableOpacity>
                    <View style={{paddingTop:25}}></View>
      </View>
    );
  }


}

const inputWidth=window.window.width-60;

const styles = StyleSheet.create({
    loginButton:{
        width:inputWidth,
        backgroundColor: "#fec105",
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    loginButtonText:{
        textAlign:"center",
        color:"#000",
        fontFamily:'open-sans'
    },
});