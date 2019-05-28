import React from "react";
import { StyleSheet, View, Text, TextInput, Alert,Image, TouchableOpacity} from "react-native";
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
            <View style={{paddingTop:15}}></View>
            
                    <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onLoginPress}  >
                    <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
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
        plainTextButtonBG: {
            backgroundColor: "#fff",
            paddingHorizontal: 30,
            paddingVertical: 5,
            borderRadius: 30
            },
        plainTextButtonText: {
            color: "#005",
            }
    }
);
