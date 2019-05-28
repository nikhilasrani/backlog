import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity} from "react-native";
import * as firebase from "firebase";
import window from "../../constants/Layout"

export default class SignUpScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            passwordConfirm:"",

         };
    }

    onSignUpPress = () =>{
        if(this.state.password!== this.state.passwordConfirm){
            Alert.alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=> {this.props.navigation.navigate('App')}, (error) => {
        Alert.alert(error.message);
        })
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login")
    }

    render(){
        return <View style={{paddingTop:50, alignItems:"center"}}>
<Text>Sign Up with your details below</Text>
<View style={{paddingTop:15}}></View>
            <Image  style={styles.imageStyle} 
            source={require("../../assets/images/Fingerprint.png")}/>

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
            
            <TextInput style={styles.textInput}
             value={this.state.passwordConfirm}
             onChangeText={(text) => {this.setState({passwordConfirm:text})}}
             placeholder="Confirm Password"
             secureTextEntry
             autoCapitalize="none"
             autoCorrect={false}/> 

             <View style={{paddingTop:15}}></View>
             <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSignUpPress}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                    </TouchableOpacity>

            <View style={{paddingTop:15}}></View>

                    <TouchableOpacity
                    style={styles.customBtnBG}
                    onPress={this.onBackToLoginPress}>
                    <Text style={styles.customBtnText}>Back to Login</Text>
                    </TouchableOpacity>

        </View>
    }
}

const inputWidth=window.window.width-60;
const styles=  StyleSheet.create(
    {
        textInput: {
        width:inputWidth,
        height:50,
        marginHorizontal: 25,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderWidth: 1
        },
        imageStyle:{
            height:200,
            width:200
        },
        loginButton:{
            width:inputWidth,
            backgroundColor: "#fec105",
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 15,
            },
            loginButtonText:{
                textAlign:"center",
                color:"#ffd"
            },
            customBtnText: {
                // fontSize: 20,
                // fontWeight: '300',
                color: "#005",
            },
            customBtnBG: {
                backgroundColor: "#fff",
                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 30
                }
    }
);
