import React from "react";
import { StyleSheet, View, Text, Button, TextInput, Alert,Image} from "react-native";
import * as firebase from "firebase";
import window from "../../constants/Layout"

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

onCreateAccountPress = () => {
this.props.navigation.navigate("Signup")

}
onForgotPasswordPress = () => {
    this.props.navigation.navigate("ForgotPassword")
}
    render(){
        return <View style={{paddingTop:50, alignItems:"center"}}>
            <Image style={styles.imageStyle} source={require("../../assets/images/undraw.png")}/>
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
            
            <Button title="Login" 
            onPress={this.onLoginPress}
            style={styles.buttonStyle}
            color= "#fec105"/>

            <View style={{paddingTop:15}}></View>

            <Button title="Create Account"
             onPress={this.onCreateAccountPress}
             style={styles.buttonStyle}
             color= "#fec105"/>

            <View style={{paddingTop:15}}></View>

            <Button title="Forgot Password?"
            onPress={this.onForgotPasswordPress}
            style={styles.buttonStyle}
            color= "#fec105"/>
        </View>
    }
}

const styles=  StyleSheet.create(
    {
        textInput: {
            width:window.window.width,
            height:50,
            marginHorizontal: 25,
            paddingHorizontal: 50,
            borderRadius: 20,
            borderWidth: 1
        },
        buttonStyle:{
            borderRadius: 25,
            color: "#fce105"
        },
        imageStyle:{
            height:200,
            width:200
        }
    }
);
