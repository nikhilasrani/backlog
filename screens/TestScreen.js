import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,Image, FlatList, ActivityIndicator
} from 'react-native';
import window from "../constants/Layout"
import * as firebase from "firebase"
import {Card} from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    if(!this.state.loading) return <View style={{paddingTop:35}}></View>;
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
_fetchUserLinks = () => {
  var user = firebase.auth().currentUser;
    var that = this;
    const {page, seed} = that.state;
    that.setState({loading:true});
    if (user != null) {
      return firebase.database().ref(`users/${user.uid}/savedLinks/`).once('value', function(snapshot){
        console.log(snapshot.val());
        //^ Firebase response as a JSON Object
        const linksToArray =Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
        console.log(linksToArray);
      
        // ^ JSON Object converted to an Array of Objects with the unique value as a key
        that.setState({links:linksToArray,loading:false, refreshing:false});
      })}

}
_renderItem = ({item}) => {
  var url=item.link.url.toString();
    
  //Checking if the link is Twitter 
  if(url.substring(0,15)==='https://twitter'){
    return <Card containerStyle={{borderRadius:8}}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flexDirection:"row"}}>
          <Image style={{height:40,width:40, borderRadius:8}} source={{uri:item.link.images[0]}}/>
          <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{item.link.title.substring(0,item.link.title.length-10)}</Text>
        </View>
      <MaterialCommunityIcons name="twitter" size={20}	color="#1da1f2"/>
      </View>
      <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(1,item.link.description.length-1)}</Text>
      </Card>
  }

  //Checking if the link is Reddit
  if(url.substring(0,18)==='https://www.reddit'){
    var hyphen= item.link.title.indexOf("-");
    var subreddit = item.link.title.substring(0,hyphen-1);
    var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
    return <Card containerStyle={{borderRadius:8}}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{}}>
          <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
        </View>
      <MaterialCommunityIcons name="reddit" size={20}	color="#FF5700"/>
      </View>
      <Text style={{paddingVertical:15, color:"#000", fontSize:20,textAlign:"center"}}>{redditTitle}</Text>
      <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
      </Card>
  }



  switch(item.link.mediaType){
    case 'article':
      //Twitter tweets shared from the UI
     return  <Card title={item.link.title} image={{uri:item.link.images[0]}}><Text>{item.link.description}</Text></Card>
    case 'image':
        return  <Card title={item.link.title} image={{uri:item.link.images[0]}}><Text>{item.link.description}</Text></Card>
    case 'video':
    case 'website':
        return  <Card title={item.link.title}><Text>{item.link.description}</Text></Card>
    case 'application':
    case 'audio':
    
    default:
      return <View style={{paddingVertical:20}}><Text>{item.link.url}</Text></View>
  }

}


  render() {
    return (
      <View style={{paddingTop:30, alignItems:"center"}}>
        <FlatList
        data={this.state.links}
        renderItem={this._renderItem}
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
},
cardStyle: {
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "#ddd",
  borderBottomWidth: 0,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 10
}
});
