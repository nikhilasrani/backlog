import React, { Component } from "react";
import {Image, View} from "react-native";
import window from "../constants/Layout"


class Loading extends Component {

  render() {
    return (
    <View style={styles.viewStyle}>
    <Image
    source={require("../assets/images/LoadingCircle.gif")}
    style={styles.onBoardingImage}
    /></View>
    )
}
}

const inputHeight = Math.round(window.window.height/2);
const styles = {
    onBoardingImage:{
        height:50,
        width:50,
        alignItems:"center"
    },
    viewStyle: {
        paddingTop:inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }
}
export default Loading;