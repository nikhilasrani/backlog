import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, Image} from "react-native";
import * as firebase from "firebase";
import window from "../../constants/Layout"

export default class ForgotPasswordScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            email:"",
        };
    }

onResetPasswordPress = () => {
firebase.auth().sendPasswordResetEmail(this.state.email)
.then(()=> {
    Alert.alert("Password reset email has been sent.")
this.props.navigation.navigate("Login")
}, (error) => {
    Alert.alert(error.message);
})
}
    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login")
            }
    render(){
        return <View style={{paddingTop:50, alignItems:"center"}}>
            <Text> Forgot Password?</Text>
            <Image  style={styles.imageStyle} 
            source={require("../../assets/images/ForgotPassword.png")}/>
            <Text> Enter your email address and we will send a password reset link to you!</Text>
            <View style={{paddingTop:15}}></View>
            <TextInput 
            style={styles.textInput}
            value={this.state.email}
            onChangeText={(text) => {this.setState({email:text})}}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}/>

            <View style={{paddingTop:15}}></View>
            
            <Button 
            title="Reset Password" 
            onPress={this.onResetPasswordPress}
            color="#fec105"/>

            <View style={{paddingTop:15}}></View>

            <Button 
            title="Back to Login" 
            onPress={this.onBackToLoginPress}
            color="#fec105"/>
        </View>
    }
}

const styles=  StyleSheet.create({
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

});
