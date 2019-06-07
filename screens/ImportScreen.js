import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from "firebase"
import window from "../constants/Layout"
export default class ImportScreen extends React.Component {
  static navigationOptions = {
   // header: null,
    headerTitle:"Upload"
  };
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }
componentDidMount = () => {
var that = this;
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    //Logged In
that.setState({
  isAuthenticated:true
})
  }
  else{
    //Not logged in
    isAuthenticated:false
  }
})
}
  onSignoutPress = () => {
    firebase.auth().signOut()
    .then(()=> {
      this.setState({isAuthenticated: false})
      this.props.navigation.navigate("Auth")})
  }
  render() {
    return (
      <View style={{flex:1,paddingTop:30, alignItems:"center", backgroundColor:"#fff"}}>
        {this.state.loggedIn == true ? (
        //User is logged in
          <View><Text>Click on the sign out button to sign out</Text>
        <View style={{paddingTop:25}}></View>
        <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSignoutPress}  >
                    <Text style={styles.loginButtonText}>Signout</Text>
                    </TouchableOpacity>
                    <View style={{paddingTop:25}}></View></View>
        ) : (/*User is not Logged In*/ 
          <View>
            <Text>You are not logged in </Text>
            <Text> Please login to be able to Upload </Text>
            </View>)
        }
        
      </View>
    )
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
});