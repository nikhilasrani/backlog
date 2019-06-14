import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,Image, FlatList, ActivityIndicator
} from 'react-native';
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
        if(!snapshot.val()){
        return;
        }
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
    return <Card containerStyle={styles.cardStyle}>
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

  //Checking if the link is Reddit and is an image mediatype
  if(url.substring(0,18)==='https://www.reddit' && item.link.mediaType==='image'){
    var hyphen= item.link.title.indexOf("-");
    var subreddit = item.link.title.substring(0,hyphen-1);
    var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
    return <Card containerStyle={styles.cardStyle}>
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

   //Checking if the link is Reddit and is a website mediatype
   if(url.substring(0,18)==='https://www.reddit' && item.link.mediaType==='website'){
    var hyphen= item.link.title.indexOf("-");
    var subreddit = item.link.title.substring(0,hyphen-1);
    var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
    return <Card containerStyle={styles.cardStyle}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flexDirection:"row"}}>
          <Image style={{height:40,width:40, borderRadius:8}} source={{uri:item.link.images[0]}}/>
          <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
        </View>
      <MaterialCommunityIcons name="reddit" size={20}	color="#FF5700"/>
      </View>
      <Text style={{paddingVertical:15, color:"#000", fontSize:20,textAlign:"center"}}>{redditTitle}</Text>
      
      </Card>
  }
  
//Checking if the link is a song from Apple Music
if(url.substring(0,19)==='https://music.apple' && item.link.mediaType==='music.song'){
  return <Card containerStyle={styles.cardStyle}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
          <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
        </View>
      <MaterialCommunityIcons name="apple" size={20}/><Text>MUSIC</Text>
      </View>
      <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
      <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.indexOf("."))}</Text>
      </Card>
}

//Checking if the link is a song from Spotify
if(url.substring(0,20)==='https://open.spotify' && item.link.mediaType==='music.song'){
  return <Card containerStyle={styles.cardStyle}>
      <View style={{flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
        <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
          <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
        </View>
      <MaterialCommunityIcons name="spotify" size={20} color="#1db954"/>
      </View>
      <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
      <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.length-11)}</Text>
      </Card>
}

//Checking if a link is from Instagram

if(url.substring(0,21)==='https://www.instagram' && item.link.mediaType==='photo'){
  return <Card containerStyle={styles.cardStyle}>
  <View style={{flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
    <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
      <Text style={{ fontWeight:"bold"}}>{item.link.title.substring(item.link.title.indexOf(":")+2,item.link.title.length-1)}</Text>
    </View>
  <Image source={{uri:item.link.favicons[0]}} style={{height:20,width:20}}/>
  </View>
  <Image style={{height:306,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
  <Text style={{paddingTop:10, color:"#000"}}>{item.link.description}</Text>
  </Card>
}


  switch(item.link.mediaType){
    case 'article':
     return  <Card containerStyle={styles.cardStyle}>
       <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
          <Text style={{fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
        </View>
        <Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>
       </View>
       <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
       <Text>{item.link.description}</Text>
       </Card>
    case 'image':
        return  <Card containerStyle={styles.cardStyle} title={item.link.title} image={{uri:item.link.images[0]}}><Text>{item.link.description}</Text></Card>
    
    case 'website':
      return  <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
         <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
           <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
         </View>
         <Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>
        </View>
        <Text>{item.link.description}</Text>
        </Card>


    case 'video':
    case 'application':
    case 'audio':
    
    default:
      return <Card style={styles.containerStyle}><View style={{paddingVertical:20}}><Text>{item.link.url}</Text></View></Card>
  }

}

_renderList = () => {
if(this.state.links.length){
  return <FlatList
  data={this.state.links}
  renderItem={this._renderItem}
  keyExtractor={(item,index)=>item.key}
  refreshing={this.state.refreshing}
  onRefresh={this.handleRefresh}
  ListFooterComponent={this.renderFooter}
  />
}

return <View style={{justifyContent: 'center', alignItems: 'center'}}>
  <Text style={{fontSize:16, color:"#b3b3b3", paddingTop:15}}>No Saved Links</Text>
  <Image style={{height:300, width:300, resizeMode:"contain"}} source={require("../assets/images/Empty.png")}/>
  <Text style={{paddingVertical:15, fontSize:22, fontWeight:"bold"}}>Empty List</Text>
  <Text style={{fontSize:16, color:"#b3b3b3", paddingHorizontal:45,textAlign:"center"}}>
    Add a link using the '+' button below or refresh the feed to fetch your saved links
    </Text>
    <View style={{paddingTop:25}}></View>
    <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.handleRefresh}>
                    <Text style={styles.loginButtonText}>Refresh Feed</Text>
                    </TouchableOpacity>

</View>
}

  render() {
    return (
      <View style={{ alignItems:"center"}}>
        {this._renderList()}
      </View>
    );
  }


}


const styles = StyleSheet.create({
  textStyle:{
  },
  imageStyle:{
    height:200,
    width:200
},
loginButton:{
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
  shadowOffset: { width: 0, height: 9 },
  shadowOpacity: 0.8,
  shadowRadius: 12.35,
  elevation: 19,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 10,
}
});
