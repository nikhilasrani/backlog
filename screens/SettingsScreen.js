import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Image,
  Alert,
} from 'react-native';
import * as firebase from "firebase"
import window from "../constants/Layout"
import {Feather} from "@expo/vector-icons"

export default class Settings extends React.Component {
  static navigationOptions = {
   // header: null,
    title:"Profile"
  };

  onSignoutPress = () => {
    firebase.auth().signOut()
    .then(()=> {
      this.setState({isAuthenticated: false});
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.props.navigation.navigate("Auth")})
      AsyncStorage.setItem("isAuthenticated","false");
  }

  onEmailVerificationPress = () => {
    var user = firebase.auth().currentUser;
    if(!user.emailVerified){
    user.sendEmailVerification().then(function() {
        // Email sent.
        Alert.alert("Verification email has been sent successfully. Please Logout and Login after verifying to see the changes.");
        this.props.navigation.navigate("Settings")
    }).catch(function(error) {
     // An error happened.
     Alert.alert(error.message);
        });}
        else{
        Alert.alert("Your email address has already been verified.")
        }
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
      <View style={{flex:1,paddingTop:30, backgroundColor:"#fff"}}>
                     <View style={{flexDirection:"row", justifyContent:"space-around"}}><Image style={styles.imageStyle} source={{uri:photoUrl}}/>
                     <View>
                     <Text style={{fontSize:25}}>{name}</Text>
                      <Text>{email}</Text>
                     </View>
                     </View> 
                     <View style={{paddingTop:75, alignItems:"center"}}>
                     <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onEmailVerificationPress}>
                    <Text style={styles.loginButtonText}>Verify Email</Text>
                    </TouchableOpacity>
                    <View style={{paddingTop:25}}></View>
        <Text>Click on the sign out button to sign out</Text>
        <View style={{paddingTop:25}}></View>
        <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSignoutPress}  >
                    <Text style={styles.loginButtonText}>Logout</Text>
                    </TouchableOpacity></View>  
                    <View style={{paddingTop:25}}>
                      
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