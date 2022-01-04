import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';


import * as firebase from 'firebase';
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADrdcmsuXoUcsVcd_rKx97StjflVnUuOE",
  authDomain: "chat-app-9e3dd.firebaseapp.com",
  projectId: "chat-app-9e3dd",
  storageBucket: "chat-app-9e3dd.appspot.com",
  messagingSenderId: "353608822396",
  appId: "1:353608822396:web:31093472132c29d86fe3f9"
};

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,

    };

    //initializing firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // reference to the Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;

  }



  //   componentDidMount() {
  //     const { name } = this.props.route.params;
  //     this.props.navigation.setOptions({ title: name ? name : "Anonymous" });


  //  }

  componentDidMount() {
    // Set the page title once Chat is loaded
    const { name } = this.props.route.params;
    // Adds the name to top of screen
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" })

    //To find out user's connection status
    NetInfo.fetch().then(connection => {
      //actions when user is online
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');



        // user can sign in anonymously
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          //update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
            },
          });
          // listens for updates in the collection
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate)
          //referencing messages of current user
          this.refMsgsUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
        //save messages when online
        this.saveMessages();

      } else {
        this.setState({ isConnected: false });
        console.log('offline');
        //retrieve chat from asyncstorage
        this.getMessages();
      }
    });
  }


  // when updated set the messages state with the current data 
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        // image: data.image || null,
        // location: data.location || null,
      });
    });
    this.setState({
      messages: messages
    });
  };

  //unsubscribe from collection updates
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  // Add messages to database
  addMessages() {
    const message = this.state.messages[0];
    // add a new messages to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  //retrieve chat from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      //wait until asyncStorage promise settles
      messages = await AsyncStorage.getItem('messages') || [];//set empty if there is no storage item
      this.setState({
        messages: JSON.parse(messages)//convert the saved string back into an object
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //save newly added messages to state.messgaes
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  //delete stored messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // calback function for when user sends a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    })
  }

  // custom function for chat message 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    })
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
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar
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
    color: '#ffffff',
    marginTop: 100,
    paddingLeft: 50,
    fontSize: 40,

  }
})