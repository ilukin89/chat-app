import React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import bgImage from '../assets/bgImage.png';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '#fff',
      bgImage: bgImage,
      swatch1: '#090C08',
      swatch2: '#474056',
      swatch3: '#8A95A5',
      swatch4: '#B9C6AE'
    };
  }

  setBgImage = (img) => {
    this.setState({ bgImage: img })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >

          <Text stye={styles.appTitle}>Chat App</Text>
          <TextInput value={this.state.name} style={styles.username}
            placeholder='Enter your username' onChangeText={(text) => this.setState({ name: text })} />
          <Text style={styles.subtitle}>Choose Background Color</Text>


          <View style={styles.swatches}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Select black background"
              accessibilityHint="Lets you choose a black background for the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState(swatch1)}
            >
              <View style={styles.swatch1}></View>
            </TouchableOpacity>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Select purple background"
              accessibilityHint="Lets you choose a purple background for the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState(swatch2)}
            >
              <View style={styles.swatch2}></View>
            </TouchableOpacity>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Select slate background"
              accessibilityHint="Lets you choose a slate background for the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState(swatch3)}
            >
              <View style={styles.swatch3}></View>
            </TouchableOpacity>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Select lime background"
              accessibilityHint="Lets you choose a lime background for the chat screen"
              accessibilityRole="button"
              onPress={() => this.setState(swatch4)}
            >
              <View style={styles.swatch4}></View>
            </TouchableOpacity>
          </View>


          <Button
            title="Start chatting" style={styles.btn}
            onPress={() => this.props.navigation.navigate('Chat', {
              name: this.state.name, bgColor: this.state.bgColor,
              bgImage: this.state.bgImage,
            })}
          />
        </ImageBackground>
      </View>


    );

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    justifyContent: 'center',

  },

  username: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50
  },

  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff'
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },

  swatches: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  swatch1: {
    width: 40,
    height: 40,
    backgroundColor: "#090C08",
    borderRadius: 40,
  },

  swatch2: {
    width: 40,
    height: 40,
    backgroundColor: "#474056",
    borderRadius: 40,
  },

  swatch3: {
    width: 40,
    height: 40,
    backgroundColor: "#8A95A5",
    borderRadius: 40,
  },

  swatch4: {
    width: 40,
    height: 40,
    backgroundColor: "#B9C6AE",
    borderRadius: 40,
  },

  btn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#757083'
  },

});


