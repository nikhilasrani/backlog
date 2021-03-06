import React from "react";
import { StyleSheet, View, Text, TextInput, Alert, Image, TouchableOpacity} from "react-native";
import * as firebase from "firebase";
import RoundButton from "../../components/RoundButton"
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
            <Text style={{textAlign:"center", fontSize:26}}> Forgot Password?</Text>
            <Image  style={styles.imageStyle} 
            source={require("../../assets/images/ForgotPassword.png")}/>
            <Text style={{textAlign:"center"}}> Enter your email address and we will send a password reset link to you!</Text>
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
            <RoundButton wide title={"Reset Password"} onPress={this.onResetPasswordPress}/>
            <View style={{paddingTop:15}}></View>

                    <TouchableOpacity
                    style={styles.plainTextButtonBG}
                    onPress={this.onBackToLoginPress}>
                    <Text style={styles.plainTextButtonText}>Back to Login</Text>
                    </TouchableOpacity>

        </View>
    }
}
const inputWidth=window.window.width-60;

const styles=  StyleSheet.create({
    textInput: {
        width:inputWidth,
        height:50,
        marginHorizontal: 25,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderWidth: 1,
    },
    imageStyle:{
        height:200,
        width:200
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

});
