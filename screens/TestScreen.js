import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,Image
} from 'react-native';
import window from "../constants/Layout"

export default class TestScreen extends React.Component {
  static navigationOptions = {
    //header: null,
    title:"Home"
  };
  constructor(props){
    super(props);
    this.state= {
      count:0
    }
  }
  incrementCounter= () => {
    this.setState({
      count:this.state.count+1
    })
  }
  decrementCounter= () => {
    this.setState({
      count:this.state.count-1
    })
  }

  nothingHere() {
if(this.state.count<=1){
  return <Image source={require("../assets/images/Empty.png")} style={styles.imageStyle}/>
}}
  render() {
    let { count } =this.state;
    let nothingHere;
    if(this.state.count<1){
      nothingHere = <View style={{alignItems:"center"}}><Text style={styles.textStyle}>There seems to be nothing here! Add an item by selecting one of the options in our menu</Text><Image source={require("../assets/images/Empty.png")} style={styles.imageStyle}/></View>
    }

    return (
      <View style={{paddingTop:30, alignItems:"center"}}>
        <Text style={styles.textStyle}>Nothing here image will render as long as counter is less than 1</Text>
        <View style={{paddingTop:25}}></View>
        <Text style={styles.textStyle}>Counter:{count}</Text>
        <View style={{paddingTop:25}}></View>
        <View style={{alignItems:"center"}}>{nothingHere}</View>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.roundButton} onPress={this.incrementCounter}>
        <Text style={styles.loginButtonText}>+</Text>
        </TouchableOpacity>
        <Text>{count}</Text>
        <TouchableOpacity style={styles.roundButton} onPress={this.decrementCounter}>
        <Text style={styles.loginButtonText}>-</Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingTop:25}}></View>
        
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
