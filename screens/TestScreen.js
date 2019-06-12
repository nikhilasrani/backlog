import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,Image, FlatList
} from 'react-native';
import window from "../constants/Layout"
import * as firebase from "firebase"

export default class TestScreen extends React.Component {
  static navigationOptions = {
    //header: null,
    title:"Home"
  };

  constructor(props){
    super(props);
    this.state= {
      links:[]
    }
  }
 

  componentWillMount (){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var that = this;
    if (user != null) {
      firebase.database().ref(`users/${user.uid}/savedLinks/`).once('value', function(snapshot){
        console.log(snapshot.val());
        //^ Firebase response as a JSON Object
        const linksToArray =Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
        console.log(linksToArray);
      
        // ^ JSON Object converted to an Array of Objects with the unique value as a key
        that.setState({links:linksToArray});
      })}
  }
  
//   renderListItem = ({item}) => {
// <View>
//   <Text>{item.link}</Text>
// </View>
//   }


  render() {

    return (
      <View style={{paddingTop:30, alignItems:"center"}}>
        <FlatList
        data={this.state.links}
        renderItem={({item})=><Text>{item.link}</Text>}
        keyExtractor={(item,index)=>item.key}
        
        />
      </View>
    );
  }


}

const inputWidth=window.window.width-60;
const styles = StyleSheet.create({
  textStyle:{
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
  color:"#000",
},
roundButton:{
  backgroundColor: "#fec105",
  borderRadius: 100,
  height:50,
  width:50
}
});
