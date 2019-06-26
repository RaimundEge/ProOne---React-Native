import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Home.js';
import AppNavigator from './AppNavigator';
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  pizza = '&#x1f355;';


  render() {
    return <AppContainer />;
 /*   (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Hello, my Worlds!</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          &#x1f355;
          { this.pizza }
        </Text>
        <Home /> 
        </View>
                  
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe',
    padding: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
