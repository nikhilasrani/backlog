import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons"

export default CloseButton = ({onPress}) => {
return <View style={{position:"absolute",top:0, right:0}}>
<TouchableOpacity onPress={onPress}>  
		  <Feather
                  name="x"
				  color="#A5A8B0"
				  size={30}
                />
		</TouchableOpacity>
</View>
}