import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
  }

  render() {
    const { bgColor } = this.props.route.params

    return (
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        <Text style={styles.welcomeText}>Welcome to Chat</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  welcomeText: {
    color: '#fff',
    marginTop: 100,
    paddingLeft: 50,
    fontSize: 40,

  }
})