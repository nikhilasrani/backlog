# Backlog
A React Native application that allows you to save context rich URLs for later.




## Built With

* [React Native](https://facebook.github.io/react-native/) - Framework for building native apps using React.
* [Expo](https://expo.io/) - Open Source toolchain built around React Native to make development easier.
* [React Native Paper](https://reactnativepaper.com) - A few components from this open source project along with many custom components. 
* [unDraw](https://undraw.co/) - Used their beautiful open source Illustrations.

## Prerequisites

You will need to have the Expo app installed on your phone in order to be able to run the application natively.
You can also use the iOS or Android simulators if you want to. 

In order to get the back-end to work, you will need to create your own firebase instance and configure it with the following API Keys,
add it to the project directory and import it into the App.js file in order for the application to work.

```
export default {
    firebaseConfig: { 
    apiKey: "XXXX",
    authDomain: "XXXX",
    databaseURL: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXX",
    appId: "XXXX"
    },
}
```
## Installation

Run the npm install command to install the development tools and prerequisite dependencies and node modules.

```
npm install
```

## Running the Application

After installation, you can run the application using npm start or expo start
```
npm start
```
```
expo start
```

## Building the Application (to make .ipa or .apk files)
Since this application is using an Expo managed workflow, 
Expo handles the build process and provides you with the required files for whichever platform.

```
expo build:android
```
```
expo build:ios
```

##Contributing

Feel free to reach out to me or send in a pull request in case you'd like to contribute to this project.

