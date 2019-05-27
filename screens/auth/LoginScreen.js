import React from "react";
import { StyleSheet, View, Text, Button, TextInput, Alert} from "react-native";
import * as firebase from "firebase"

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
            <TextInput 
            style={{width:200, height: 40, borderWidth:1}}
            value={this.state.email}
            onChangeText={(text) => {this.setState({email:text})}}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}/>

<View style={{paddingTop:15}}></View>

            <TextInput style={{width:200, height: 40, borderWidth:1}}
             value={this.state.password}
             onChangeText={(text) => {this.setState({password:text})}}
             placeholder="Password"
             secureTextEntry
             autoCapitalize="none"
             autoCorrect={false}/>
            
            <Button title="Login" onPress={this.onLoginPress}/>
            <View style={{paddingTop:15}}></View>
            <Button title="Create Account" onPress={this.onCreateAccountPress}/>
            <View style={{paddingTop:15}}></View>
            <Button title="Forgot Password?" onPress={this.onForgotPasswordPress}/>
        </View>
    }
}

const styles=  StyleSheet.create();
