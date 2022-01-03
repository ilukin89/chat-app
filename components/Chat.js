import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      messages: [],
    }
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',

          },
        },

        {
          _id: 2,
          text: `${this.props.route.params.name} has joined the chat. `,
          createdAt: new Date(),
          system: true,

        },

      ],
    })
  }

  // custom function for chat message 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ebaa2a'
          }
        }}
      />
    )
  }

  render() {
    const { bgColor } = this.props.route.params

    return (
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        <Text style={styles.welcomeText}>Welcome to Chat</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
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