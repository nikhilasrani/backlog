import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import {Card, Chip} from "react-native-paper";
  
  import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
  
export default ListItem = ({item}) => {
  var url=item.link.url.toString(); 
    //Checking if the link is Twitter 
    if(url.substring(0,15)==='https://twitter'){
      return <Card style={styles.cardStyle}>
        <View style={{padding:5, flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:35,width:35, borderRadius:8}} source={{uri:item.link.images[0]}}/>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{item.link.title.substring(0,item.link.title.length-10)}</Text>
          </View>
          <Chip avatar={<MaterialCommunityIcons name="twitter" size={25}	color="#1da1f2"/>} mode="outlined">Twitter</Chip>
        </View>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(1,item.link.description.length-1)}</Text>
        </Card>
         
    }
  
    //Checking if the link is Reddit and is an image mediatype
    if(url.substring(0,18)==='https://www.reddit' && item.link.mediaType==='image'){
      var hyphen= item.link.title.indexOf("-");
      var subreddit = item.link.title.substring(0,hyphen-1);
      var redditTitle = item.link.title.substring(hyphen+2,item.link.title.length);
      return <Card style={styles.cardStyle}>
        <View style={{padding:5,flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{}}>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
          </View>
          <Chip avatar={<FontAwesome name="reddit" size={22}	color="#FF5700"/>} mode="outlined">Reddit</Chip>
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
      return  <Card style={styles.cardStyle}>
        <View style={{padding:5,flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:40,width:40, borderRadius:8}} source={{uri:item.link.images[0]}}/>
            <Text style={{paddingHorizontal:12, fontWeight:"bold", fontSize:16}}>{subreddit}</Text>
          </View>
          <Chip avatar={<FontAwesome name="reddit" size={22}	color="#FF5700"/>} mode="outlined">Reddit</Chip>
        </View>
        <Text style={{paddingVertical:15, color:"#000", fontSize:20,textAlign:"center"}}>{redditTitle}</Text>
        </Card>
    }
    
  //Checking if the link is a song from Apple Music
  if(url.substring(0,19)==='https://music.apple' && (item.link.mediaType==='music.song'||item.link.mediaType==='music.album')){
    return  <Card style={styles.cardStyle}>
        <View style={{padding:5,flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
            <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
          </View>
          <Chip avatar={<MaterialCommunityIcons name="apple" size={20}/>} mode="outlined">Music</Chip>
        </View>
        <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.indexOf("."))}</Text>
        </Card>
  }
  
  //Checking if the link is a song from Spotify
  if(url.substring(0,20)==='https://open.spotify' && item.link.mediaType==='music.song'){
    return <Card style={styles.cardStyle}>
        <View style={{padding:5,flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
          <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
            <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
          </View>
          <Chip avatar={<MaterialCommunityIcons name="spotify" size={25} color="#1db954"/>} mode="outlined">Spotify</Chip> 
        </View>
        <Image style={{height:200,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
        <Text style={{paddingTop:10, color:"#000"}}>{item.link.description.substring(0,item.link.description.length-11)}</Text>
        </Card>
  }
  
  //Checking if a link is from Instagram
  
  if(url.substring(0,21)==='https://www.instagram' && item.link.mediaType==='photo'){
    return <Card style={styles.cardStyle}>
    <View style={{padding:5,flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
      <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
        <Text style={{ fontWeight:"bold"}} numberOfLines={2}>{item.link.title.substring(item.link.title.indexOf(":")+2,item.link.title.length-1)}</Text>
      </View>
      <Chip avatar={<Image source={{uri:item.link.favicons[0]}} style={{height:25, width:25}}/>} mode="outlined">Instagram</Chip> 
    
    </View>
    <Image style={{height:306,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
    <Text style={{paddingTop:10, color:"#000"}}>{item.link.description}</Text>
    </Card>
  }
  
  //Checking if a link is from Youtube 
  
  if(url.substring(0,19)==='https://www.youtube'){
    return <Card style={styles.cardStyle}>
    <View style={{padding:5,flexDirection:"row", justifyContent:"space-between", paddingBottom:15}}>
      <View style={{flexDirection:"row",flex:1, flexWrap:"wrap"}}>
        <Text style={{ fontWeight:"bold"}}>{item.link.title}</Text>
      </View>
      <Chip avatar={<MaterialCommunityIcons name="youtube" size={25} color="#ff0000"/>} mode="outlined">Youtube</Chip>
    </View>
    <Image style={{height:306,paddingTop:10, borderRadius:8, resizeMode:"contain"}} source={{uri:item.link.images[0]}}/>
    <Text style={{paddingTop:10, color:"#000"}}>{item.link.description}</Text>
    </Card>
  }
    switch(item.link.mediaType){
      case 'article':
       return  <Card style={styles.cardStyle}>
         <View style={{padding:5,flexDirection:"row", justifyContent:"space-between"}}>
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
      case 'website':
        return <Card style={styles.cardStyle}>
          <View style={{padding:5, flexDirection:"row", justifyContent:"space-between"}}>
           <View style={{flexDirection:"row", flex:1, flexWrap:"wrap"}}>
             <Text style={{ fontWeight:"bold", fontSize:16}}>{item.link.title}</Text>
           </View>
           <Image style={{height:20,width:20}} source={{uri:item.link.favicons[0]}}/>
          </View>
          <View style={{paddingTop:15}}></View>
          <Text>{item.link.description}</Text>
          </Card>
  
      case 'image':
      case 'video':
      case 'application':
      case 'audio':
      
      default:
        return  <Card style={styles.cardStyle}>
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
    }
  
  }

  const styles = StyleSheet.create({
    textStyle:{
    },
    imageStyle:{
      height:200,
      width:200
  },
  cardStyle: {
    padding:2,
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
  });
  