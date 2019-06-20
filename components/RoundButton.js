import React, {Component} from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import window from "../constants/Layout"



class RoundButton extends Component{ 
    render(){
         const {title, onPress, wide, color, titleColor} = this.props;
         return(
            <TouchableOpacity
            style={[
                styles.containerExternal,
                wide?styles.wideButton:null,
                {backgroundColor:color?color:"#fec105"}
            ]}
            onPress={onPress}>
            <Text
             style={[
                 styles.buttonText,
                 {color:titleColor?titleColor:"#000"}
                 ]}>{title}</Text>
            </TouchableOpacity>
         );
    }
   
}

RoundButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

const windowWidth=window.window.width-60;

const styles =  StyleSheet.create({
    containerExternal:{
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
      },
      buttonText:{
        textAlign:"center",
      },
      wideButton:{
        width:windowWidth,
      },
      roundButton:{
        backgroundColor: "#fec105",
        borderRadius: 100,
        height:50,
        width:50
      },
});

export default RoundButton;