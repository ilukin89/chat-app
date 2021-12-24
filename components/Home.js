import React from 'react';
//importing elements from react native
import { StyleSheet, View, Text, Button, ImageBackground, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

// importing  background image
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
      swatch4: '#B9C6AE',
    };
  }

  // function that changes background color
  setBgColor = (color) => {
    this.setState({ bgColor: color })
  }


  render() {
    return (

      <View style={styles.container}>
        {/* background image */}

        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <View style={styles.main}>
            <Text style={styles.appTitle}>Chat App</Text>
          </View>

          {/* color swatch selection box */}
          <View style={styles.box}>


            <TextInput value={this.state.name} style={styles.username}
              placeholder='Enter your username' onChangeText={(text) => this.setState({ name: text })} />
            <Text style={styles.subtitle}>Choose Background Color</Text>

            {/* color swatches menu */}
            <View style={styles.swatches}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Select black background"
                accessibilityHint="Lets you choose a black background for the chat screen"
                accessibilityRole="button"
                onPress={() => this.setBgColor(this.state.swatch1)}
              >
                <View style={styles.swatch1}></View>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Select purple background"
                accessibilityHint="Lets you choose a purple background for the chat screen"
                accessibilityRole="button"
                onPress={() => this.setBgColor(this.state.swatch2)}
              >
                <View style={styles.swatch2}></View>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Select slate background"
                accessibilityHint="Lets you choose a slate background for the chat screen"
                accessibilityRole="button"
                onPress={() => this.setBgColor(this.state.swatch3)}
              >
                <View style={styles.swatch3}></View>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Select lime background"
                accessibilityHint="Lets you choose a lime background for the chat screen"
                accessibilityRole="button"
                onPress={() => this.setBgColor(this.state.swatch4)}
              >
                <View style={styles.swatch4}></View>
              </TouchableOpacity>
            </View>

            {/* button to start chatting */}
            <Button
              title="Start chatting" style={styles.btn}
              onPress={() => this.props.navigation.navigate('Chat', {
                name: this.state.name,
                bgColor: this.state.bgColor,
                bgImage: this.state.bgImage,
              })}
            /></View>
        </ImageBackground>
      </View>


    );

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#151617",
    alignItems: "center",
    justifyContent: "space-between",
  },


  bgImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },



  username: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50
  },

  box: {
    backgroundColor: "#ffffff",
    flexGrow: 1,
    flexShrink: 0,
    width: "88%",
    marginTop: 60,
    marginBottom: 130,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    height: 260,
    minHeight: 260,
    maxHeight: 290,
    borderRadius: 20,
  },

  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 50
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    padding: 50
  },

  main: {
    height: 80,
    flex: 1,
    justifyContent: 'center'
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
    // color: '#ffffff',
    backgroundColor: '#757083'

  },

});


