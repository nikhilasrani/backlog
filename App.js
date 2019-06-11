import React from 'react';
import { Platform, StatusBar, StyleSheet, View,AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    //Initialize firebase...

    if(!firebase.apps.length){firebase.initializeApp(ApiKeys.firebaseConfig);}
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
 

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
    console.log(user);
    if(user){
      firebase.database().ref(`users/${user.uid}`).update({
        name: user.displayName,
        email:user.email,
        id:user.uid,
        photoURL:user.photoURL,
        emailVerified:user.emailVerified
      }).then(()=>{
        console.log("FIREBASE DATA HAS BEEN SET!")
      }).catch((error)=> console.log(error))
      AsyncStorage.setItem("id", user.uid).then((err)=> console.log(err));
    console.log(user.displayName);
    console.log(user.email);
    }
    if(user && user!==null){
    AsyncStorage.setItem("isAuthenticated","true")
    }
    else{
    AsyncStorage.setItem("isAuthenticated","false");
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.state.isAuthenticationReady && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
