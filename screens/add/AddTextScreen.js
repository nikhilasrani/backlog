import React, {Component} from "react";
import {View, Text, Image} from "react-native";
import window from "../../constants/Layout"

class AddText extends Component {
    render(){
        return(
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Text>AddText Screen</Text>
            </View>
        )
    }
}


export default AddText;

