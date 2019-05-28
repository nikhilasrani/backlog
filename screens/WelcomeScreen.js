import React, { Component } from "react";
import {Image, AsyncStorage} from "react-native";

import Onboarding from "react-native-onboarding-swiper";


class Welcome extends Component {
generateToken = async () => {
    await AsyncStorage.setItem("hasVisited", "true");
    this.props.navigation.navigate("Auth");
  };
  render() {
    return (
      <Onboarding
        skipToPage={2}
        onDone={this.generateToken}
        transitionAnimationDuration={100}
        subTitleStyles={{ fontSize: 20 }}
        pages={[
          {
              backgroundColor:"#ffffff",
            image: (
              <Image
                source={require("../assets/images/Curate.png")}
                style={styles.onBoardingImage}
              />
            ),
            title: "Curate your digital experiences",
            subtitle:
              "You can save digital information from multiple sources that influence you"
          },
          {
            backgroundColor:"#ffffff",
            image: (
              <Image
                source={require("../assets/images/Prototype.png")}
                style={styles.onBoardingImage}
              />
            ),
            title: "Ideate and Prototype more rapidly with focus",
            subtitle:
              "With all vital information in one place, its easier to focus on working with the data than getting lost in the noise of the platforms"
          },
          {
            backgroundColor:"#ffffff",
            image: (
              <Image
                source={require("../assets/images/ReactNative.png")}
                style={styles.onBoardingImage}
              />
            ),
            title: "Built with React Native",
            subtitle: "Built using React Native and other open source goodness"
          },
        ]}
      />
    );
  }
}


const styles = {
    onBoardingImage:{
        height:200,
        width:200,
        alignItems:"center"
    }
}
export default Welcome;