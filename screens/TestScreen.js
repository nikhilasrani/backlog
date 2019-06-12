import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,Image, FlatList, ActivityIndicator
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
      loading:false,
      links:[],
      page:1,
      seed:1,
      error:null,
      refreshing:false,
    }
  }
 

  componentWillMount (){
  this._fetchUserLinks();
  }

  renderFooter = () => {
    if(!this.state.loading) return null;
    
    return(
      <View style={{paddingVertical:30,}}>
        <ActivityIndicator animating size="large"/>
      </View>
    )
  }

  handleRefresh = () => {
    this.setState({refreshing: true,
    page:1,
    seed: this.state.seed+1
},()=> {
  this._fetchUserLinks();
});

  }
  
//   renderListItem = ({item}) => {
// <View>
//   <Text>{item.link}</Text>
// </View>
//   }

_fetchUserLinks = () => {
  var user = firebase.auth().currentUser;
    var that = this;
    const {page, seed} = that.state;
    that.setState({loading:true});
    if (user != null) {
      firebase.database().ref(`users/${user.uid}/savedLinks/`).once('value', function(snapshot){
        console.log(snapshot.val());
        //^ Firebase response as a JSON Object
        const linksToArray =Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
        console.log(linksToArray);
      
        // ^ JSON Object converted to an Array of Objects with the unique value as a key
        that.setState({links:linksToArray,loading:false, refreshing:false});
      })}
}

  render() {

    return (
      <View style={{paddingTop:30, alignItems:"center"}}>
        <FlatList
        data={this.state.links}
        renderItem={({item})=><Text>{item.link}</Text>}
        keyExtractor={(item,index)=>item.key}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        ListFooterComponent={this.renderFooter}
        
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
