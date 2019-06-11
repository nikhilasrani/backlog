import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, StyleSheet,Text } from 'react-native';
import Modal from "react-native-modal"
import {Feather} from "@expo/vector-icons"

// constants
import {
	center,
	topCenter,
	topLeft,
	topRight,
	bigBubbleSize,
	smallBubbleSize,
	bubbleColor,
	animateTime,
	easingType,
	delay,
} from '../constants/BottomTabPositioningAnimations';

// This is the add button that appears in the middle along with
// other buttons and their animations
class AddButton extends Component {

	state = {
		visibleModal: null,
	  };

	_renderButton = (text, onPress) => (
		<TouchableOpacity onPress={onPress}>
		  <View style={styles.button}>
			<Text>{text}</Text>
		  </View>
		</TouchableOpacity>
	  );
	
	  _renderModalContent = () => (
		<View style={styles.modalContent}>
		  <Text>Hello!</Text>
		  {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
		</View>
	  );
	

	
	

	render() {

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
		{this._renderButton('Default modal', () => this.setState({ visibleModal: 1 }))}
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
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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