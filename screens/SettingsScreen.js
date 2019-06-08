import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Image
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
      this.setState({isAuthenticated: false});
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.props.navigation.navigate("Auth")})
      AsyncStorage.setItem("isAuthenticated","false");
  }
  render() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid; }
    return (
      <View style={{flex:1,paddingTop:30, alignItems:"center", backgroundColor:"#fff"}}>
        <Text>Click on the sign out button to sign out</Text>
        <View style={{paddingTop:25}}></View>
        <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSignoutPress}  >
                    <Text style={styles.loginButtonText}>Signout</Text>
                    </TouchableOpacity>
                    <View style={{paddingTop:25}}>
                      <Text>{name}</Text>
                      <Text>{email}</Text>
                      <Image style={styles.imageStyle} source={{uri:photoUrl}}/>
                    </View>
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
    },
    imageStyle:{
      height:50,
      width:50,
      borderRadius:25
    }
});