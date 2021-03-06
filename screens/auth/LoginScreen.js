import React from "react";
import { StyleSheet, View, Text, TextInput, Alert,Image, TouchableOpacity} from "react-native";
import * as firebase from "firebase";
import window from "../../constants/Layout"
import * as Facebook from 'expo-facebook';
import RoundButton from "../../components/RoundButton";

export default class LoginScreen extends React.Component{

    constructor(props){
    super(props);
    this.state = {
        email:"",
        password:""
        };
    }
onLoginPress = () => {
firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
.then(()=> {
    this.props.navigation.navigate('App');
}, (error) => {
    Alert.alert(error.message)
})
}

 async loginWithFacebook() {
    const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('2281500055512262', {
        permissions: ['email','public_profile'],
      });
      switch (type) {
        case 'success': {
        this.props.navigation.navigate('Loading');
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          await firebase.auth().signInWithCredential(credential);  // Sign in with Facebook credential

          this.props.navigation.navigate('App');
          return Promise.resolve({type: 'success'});
        }
        case 'cancel': {
          return Promise.reject({type: 'cancel'});
        }
      }
}

onCreateAccountPress = () => {
this.props.navigation.navigate("Signup")

}
onForgotPasswordPress = () => {
    this.props.navigation.navigate("ForgotPassword")
}
        render(){
        return <View style={{paddingTop:50, alignItems:"center"}}>
                    <Image style={styles.imageStyle} source={require("../../assets/images/AppLogoFull.png")}/>
                    <TextInput 
                        style={styles.textInput}
                        value={this.state.email}
                        onChangeText={(text) => {this.setState({email:text})}}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}/>

            <View style={{paddingTop:15}}></View>

            <TextInput style={styles.textInput}
             value={this.state.password}
             onChangeText={(text) => {this.setState({password:text})}}
             placeholder="Password"
             secureTextEntry
             autoCapitalize="none"
             autoCorrect={false}/>
            <View style={{paddingTop:15}}></View>
            <RoundButton wide title={"Login"} onPress={this.onLoginPress} />
            <View style={{paddingTop:25}}></View>
            
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity
            style={styles.plainTextButtonBG}
            onPress={this.onCreateAccountPress}>
            <Text style={styles.plainTextButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.plainTextButtonBG}
            onPress={this.onForgotPasswordPress}>
            <Text style={styles.plainTextButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
              </View>
              <View style={{paddingTop:25}}></View>
              <RoundButton 
              wide 
              title={"Login with Facebook"} 
              onPress={()=>this.loginWithFacebook()}
              color={"#1976f2"}
              titleColor={"#fff"} />
            <View style={{paddingTop:25}}></View>
        </View>
    }
}

const inputWidth=window.window.width-60;

const styles=  StyleSheet.create(
    {
        textInput: {
            width:inputWidth,
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderWidth: 1,
        },
        imageStyle:{
            resizeMode:'cover',
            width:inputWidth,
            height:300
        },
        plainTextButtonBG: {
            backgroundColor: "#fff",
            paddingHorizontal: 30,
            paddingVertical: 5,
            borderRadius: 30
            },
        plainTextButtonText: {
            color: "#000",
            },        
    }
);
