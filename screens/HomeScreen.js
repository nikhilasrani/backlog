import React from 'react';
import {
  StyleSheet,
  Text,
  View,Image, FlatList, ActivityIndicator, TouchableOpacity, Linking
} from 'react-native';
import * as firebase from "firebase"
import ListItem from "../components/ListItem";
import {Feather} from "@expo/vector-icons"
import window from "../constants/Layout"
import RoundButton from "../components/RoundButton"
import CloseButton from "../components/CloseButton"
import Modal from "react-native-modal";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
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
      modalVisible:null,
      selectedItemId: null,
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
  if(!user){
    this.props.navigation.navigate("Auth")
  }
    var that = this;
    const {page, seed} = that.state;
    that.setState({loading:true});
    if (user != null) {
      return firebase.database().ref(`users/${user.uid}/savedLinks/`).once('value', function(snapshot){
        //^ Firebase response as a JSON Object
        if(!snapshot.val()){
          that.setState({loading:false,refreshing:false});
        return;
        }
        const linksToArray =Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
      
        // ^ JSON Object converted to an Array of Objects with the unique value as a key
        that.setState({links:linksToArray,loading:false, refreshing:false});
      })}

}
_itemDelete = () => {
  var user = firebase.auth().currentUser;
  if(this.state.links.length>1){
firebase.database().ref(`/users/${user.uid}/savedLinks/${this.state.selectedItemId}`).remove();
  }
  if(this.state.links.length===1){
    firebase.database().ref(`/users/${user.uid}/savedLinks/`).remove();
  }
this.setState({modalVisible:null, selectedItemId:null});
this._fetchUserLinks();

}

_renderModalContent = () => (
  <View style={styles.modalContent}>
    <CloseButton onPress={()=> this.setState({modalVisible:null, selectedItemId:null})}/>
    <TouchableOpacity onPress={this._itemDelete}><Feather name="trash-2"
				  color="#A5A8B0"
				  size={30}/><Text>Delete</Text></TouchableOpacity>
    
  </View>
  );
_renderItem = ({item}) => {
  return  <View>
    <TouchableOpacity
    onPress={()=> Linking.openURL(item.link.url)}
    onLongPress={()=> this.setState({modalVisible:1, selectedItemId:item.key})}
    >
    <ListItem item={item} />
    </TouchableOpacity>
  </View>
}
_renderList = () => {
  if(this.state.loading){
    return(
      <View style={styles.loadingViewStyle}>
    <Image
    source={require("../assets/images/LoadingCircle.gif")}
    style={styles.onBoardingImage}
    /></View>
    )
  }
  // if firebase returned one or more list items successfully
if(this.state.links.length>0){
  return <View><FlatList
  data={this.state.links}
  renderItem={this._renderItem}
  keyExtractor={(item,index)=>item.key}
  refreshing={this.state.refreshing}
  onRefresh={this.handleRefresh}
  ListFooterComponent={this.renderFooter}
  />
  <View style={styles.container}>
        <Modal isVisible={this.state.modalVisible === 1} style={styles.bottomModal}>
              {this._renderModalContent()}
            </Modal>
          </View>
          </View>
          
}
if(!this.state.loading && (!this.state.links.length||this.state.links.length===0)){
return <View style={{justifyContent: 'center', alignItems: 'center'}}>
  <Text style={{fontSize:16, color:"#b3b3b3", paddingTop:15}}>No Saved Links</Text>
  <Image style={{height:300, width:300, resizeMode:"contain"}} source={require("../assets/images/Empty.png")}/>
  <Text style={{paddingVertical:15, fontSize:22, fontWeight:"bold"}}>Empty List</Text>
  <Text style={{fontSize:16, color:"#b3b3b3", paddingHorizontal:45,textAlign:"center"}}>
    Add a link using the '+' button below or refresh the feed to fetch your saved links
    </Text>
    <View style={{paddingTop:25}}></View>
    <RoundButton onPress={this.handleRefresh} title={"Refresh Feed"} />
</View>
}
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
  onBoardingImage:{
    height:50,
    width:50,
    alignItems:"center"
},
loadingViewStyle: {
    paddingTop:75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
  },
  imageStyle:{
    height:200,
    width:200
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
