import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, StyleSheet,Text, TextInput } from 'react-native';
import Modal from "react-native-modal"
import {Feather} from "@expo/vector-icons"
import * as firebase from "firebase";
import LinkPreview from 'react-native-link-preview';
import CloseButton from "./CloseButton"

// constants
import {
	bigBubbleSize,
	smallBubbleSize,
	bubbleColor,	
} from '../constants/BottomTabPositioningAnimations';

// This is the add button that appears in the middle along with
// other buttons and their animations
class AddButton extends Component {

	state = {
		enteredLink: "",
		visibleModal: null,
	  };

	_onSubmitLinkPress = (text, onPress) => (
		<TouchableOpacity onPress={onPress}>
		  <View style={styles.button}>
			<Text>{text}</Text>
		  </View>
		</TouchableOpacity>
	  );
	  _renderCloseButton = (text, onPress) => (
		<TouchableOpacity onPress={onPress}>
		  
		  <Feather
                  name="x"
				  color="#A5A8B0"
				  size={30}
                />
		</TouchableOpacity>
	  );
	
	  _renderModalContent = () => (
		<View style={styles.modalContent}>
		<CloseButton onPress={() => this.setState({ visibleModal: null })}/>
		  <Text>Paste the link you want to save here</Text>
		  <TextInput value={this.state.enteredLink}
             onChangeText={(text) => {this.setState({enteredLink:text})}}
             placeholder="Entered Link..."
             autoCapitalize="none"
             autoCorrect={false}
			 selectionColor={"#fec105"}
			 style={{
				width:250,
				borderRadius: 30,
				paddingHorizontal: 30,
				paddingVertical: 15,
				borderBottomWidth:1
			 }}
			 ></TextInput>
		  {this._onSubmitLinkPress('Submit Link', () => {
			  var user = firebase.auth().currentUser;
			  const {enteredLink} =this.state;
			 if(enteredLink){
				LinkPreview.getPreview(enteredLink.toString())
				.then(data => {
					firebase.database().ref(`users/${user.uid}/savedLinks/`).push({
						link:data
					}).then((data)=>{
						//success callback
						console.log('data '+data)
						this.setState({enteredLink:""});
					}).catch((error)=> {
						//error callback
						console.log('error '+error)
					}) 
				});
			
			}
			 
			  this.setState({ visibleModal: null })
		})}
		</View>
	  );
	

	
	

	render() {
		var user = firebase.auth().currentUser;
		var name, email, photoUrl, uid, emailVerified;
		return (
			<View>
				<TouchableOpacity
						hitSlop={{
							left: 20,
							right: 20,
							top: 20,
							bottom: 20,
						}}
						onPress={ () => this.setState({ visibleModal: 1 })}
						style={style.bigBubble}
					>
						<Feather
								name="plus"
								size={35}
								color="#000"
							/>
					</TouchableOpacity>
					<View style={styles.container}>
		{this._onSubmitLinkPress('Default modal', () => this.setState({ visibleModal: 1 }))}
		<Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
			</View></View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fec105',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
const style = StyleSheet.create({
	bigBubble: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColor,
		height: bigBubbleSize,
		width: bigBubbleSize,
		borderRadius: bigBubbleSize / 2,
		top: -30,
		left:25
	},
	smallBubble: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColor,
		height: smallBubbleSize,
		width: smallBubbleSize,
		borderRadius: smallBubbleSize / 2,
	},
});

export default AddButton;