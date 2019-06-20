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
import Modal from 'react-native-modal';
import RoundButton from "../components/RoundButton"
import CloseButton from "../components/CloseButton"


export default class Settings extends React.Component {
  static navigationOptions = {
    title:"Profile"
  };
  state = {
    visibleModal: null,
  };

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <CloseButton onPress={() => this.setState({ visibleModal: null })}/>
      <Text style={{fontSize:18,fontWeight:"bold"}}>Credits</Text>
      <Text>This Application is built using Open Source Software and Freely Licensed Illustrations and Graphics</Text>
      <Image style={{height:250, width:250}} source={require("../assets/images/OpenSource.png")}/>
      <Text>We would like to thank the respective creators for their work and contributions</Text>
      <Text>Illustrations: undraw.co</Text>
      <Text>Icons: Feather Icons</Text>
    </View>
  );

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
                       <RoundButton wide title={"Verify Email"} onPress={this.onEmailVerificationPress}/>
                    <View style={{paddingTop:25}}></View>
        <Text>Click on the sign out button to sign out</Text>
        <View style={{paddingTop:25}}></View>
        <RoundButton wide title={"Sign Out"} onPress={this.onSignoutPress}/>
        <View style={{paddingTop:25}}>
        <RoundButton wide title={"View Credits"} onPress={() => this.setState({ visibleModal: 1 })}/>
        </View>  
        <View style={{paddingTop:25}}>
        </View>
        </View>
    <Modal isVisible={this.state.visibleModal === 1}>
      {this._renderModalContent()}
        </Modal>
      </View>
    );
  }


}

const styles = StyleSheet.create({
    imageStyle:{
      height:50,
      width:50,
      borderRadius:25
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
});