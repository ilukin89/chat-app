import React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import bgImage from '../assets/bgImage.png';

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '#fff',
      bgImage: bgImage
    };
  }

  setBgImage = (img) => {
    this.setState({ bgImage: img })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Hello User!</Text>
        <TextInput value={this.state.name}
          placeholder='Enter your username' />
        <Button
          title="Go to Screen 2"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
        />

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

  }

})
