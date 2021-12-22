import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View>
        <Text>Welcome to Chat</Text>
      </View>
    );
  };
}

