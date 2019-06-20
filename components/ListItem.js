// INCOMPATIBLE WITH iOS
// In Order to Make this compatible with iOS, we need to replace 
// TouchableNativeFeedback with touchables that are compatible with iOS

import React,{useState} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    Image,
    Linking
  } from 'react-native';
  import {Card} from "react-native-elements";
  
  import { Feather,MaterialCommunityIcons } from '@expo/vector-icons';
  import Modal from "react-native-modal";
  import RoundButton from "./RoundButton"
  import CloseButton from "./CloseButton"
  

  

export default ListItem = ({item}) => {
  
  const [modalVisible, updateModalVisibility] = useState(null);
  
  
  var url=item.link.url.toString();

_itemDelete = () => {

}

  _renderModalContent = () => (
		<View style={styles.modalContent}>
            <CloseButton onPress={()=> updateModalVisibility(null)}/>
		  <RoundButton color={"red"} title={"Delete"} titleColor={"white"} onPress={this._itemDelete}/>
		</View>
	  );
      
    //Checking if the link is Twitter 
    if(url.substring(0,15)==='https://twitter'){
      return <View>
        <TouchableNativeFeedback 
        onPress={()=> Linking.openURL(item.link.url)}
        onLongPress={()=> updateModalVisibility(1)}>
          <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:40,width:40, borderRadius:8}} source={{uri:item.link.images[0]}}/>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{item.link.title.substring(0,item.link.title.length-10)}</Text>
          </View>
        <MaterialCommunityIcons name="twitter" size={20}	color="#1da1f2"/>
        </View>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(1,item.link.description.length-1)}</Text>
        </Card>
        </TouchableNativeFeedback>
        <View style={styles.container}>
        <Modal isVisible={modalVisible === 1}>
              {this._renderModalContent()}
            </Modal>
          </View>
          </View>
    }
  
    //Checking if the link is Reddit and is an image mediatype
    if(url.substring(0,18)==='https://www.reddit' && item.link.mediaType==='image'){
      var hyphen= item.link.title.indexOf("-");
      var subreddit = item.link.title.substring(0,hyphen-1);
      var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
      return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
        <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{}}>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
          </View>
        <MaterialCommunityIcons name="reddit" size={20}	color="#FF5700"/>
        </View>
        <Text style={{paddingVertical:15, color:"#000", fontSize:20,textAlign:"center"}}>{redditTitle}</Text>
        <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
        </Card>
        </TouchableNativeFeedback>
    }
  
     //Checking if the link is Reddit and is a website mediatype
     if(url.substring(0,18)==='https://www.reddit' && item.link.mediaType==='website'){
      var hyphen= item.link.title.indexOf("-");
      var subreddit = item.link.title.substring(0,hyphen-1);
      var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
      return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
        <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:40,width:40, borderRadius:8}} source={{uri:item.link.images[0]}}/>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
          </View>
        <MaterialCommunityIcons name="reddit" size={20}	color="#FF5700"/>
        </View>
        <Text style={{paddingVertical:15, color:"#000", fontSize:20,textAlign:"center"}}>{redditTitle}</Text>
        </Card>
        </TouchableNativeFeedback>
    }
    
  //Checking if the link is a song from Apple Music
  if(url.substring(0,19)==='https://music.apple' && (item.link.mediaType==='music.song'||item.link.mediaType==='music.album')){
    return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
      <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
            <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
          </View>
        <MaterialCommunityIcons name="apple" size={20}/><Text>MUSIC</Text>
        </View>
        <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.indexOf("."))}</Text>
        </Card>
        </TouchableNativeFeedback>
  }
  
  //Checking if the link is a song from Spotify
  if(url.substring(0,20)==='https://open.spotify' && item.link.mediaType==='music.song'){
    return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}><Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
          <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
            <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
          </View>
        <MaterialCommunityIcons name="spotify" size={20} color="#1db954"/>
        </View>
        <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.length-11)}</Text>
        </Card>
        </TouchableNativeFeedback>
  }
  
  //Checking if a link is from Instagram
  
  if(url.substring(0,21)==='https://www.instagram' && item.link.mediaType==='photo'){
    return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}><Card containerStyle={styles.cardStyle}>
    <View style={{flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
      <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
        <Text style={{ fontWeight:"bold"}}>{item.link.title.substring(item.link.title.indexOf(":")+2,item.link.title.length-1)}</Text>
      </View>
    <Image source={{uri:item.link.favicons[0]}} style={{height:20,width:20}}/>
    </View>
    <Image style={{height:306,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
    <Text style={{paddingTop:10, color:"#000"}}>{item.link.description}</Text>
    </Card>
    </TouchableNativeFeedback>
  }
  
  //Checking if a link is from Youtube 
  
    switch(item.link.mediaType){
      case 'article':
       return  <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
         <Card containerStyle={styles.cardStyle}>
         <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
            <Text style={{fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
          </View>
          <View style={{paddingTop:15}}></View>
          <Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>
         </View>
         <View style={{paddingTop:15}}></View>
         <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
         <Text>{item.link.description}</Text>
         </Card>
         </TouchableNativeFeedback>
      case 'website':
        return  <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
          <Card containerStyle={styles.cardStyle}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
           <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
             <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
           </View>
           <Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>
          </View>
          <View style={{paddingTop:15}}></View>
          <Text>{item.link.description}</Text>
          </Card>
          </TouchableNativeFeedback>
  
      case 'image':
      case 'video':
      case 'application':
      case 'audio':
      
      default:
        return <TouchableNativeFeedback onPress={()=> Linking.openURL(item.link.url)}>
          <Card containerStyle={styles.cardStyle}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
           <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
             {item.link.title?<Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>:null}
           </View>
           {item.link.favicons[0]?<Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>:null}
          </View>
          <View style={{paddingTop:15}}></View>
          {item.link.images[0]?<Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>:null}
          <Text>{item.link.description}</Text>
          </Card>
          </TouchableNativeFeedback>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  });
  

  //{this._onSubmitLinkPress('Default modal', () => this.setState({ visibleModal: 1 }))}

  // <View style={{position:"absolute",top:0, right:0}}>{this._renderCloseButton('Close', () => this.setState({ visibleModal: null }))}</View>