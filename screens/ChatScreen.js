/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  FlatList,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {GiftedChat,Bubble,InputToolbar} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native-virtualized-view';
Icon.loadFont().then();



const ChatScreen = ({user, route}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;
  // const mainuser = user[0]

  console.log(uid, user.uid);

  const getAllMessages = async () => {
    const docid = uid > user.uid ? user.uid+"-"+uid : uid+"-"+user.uid   
    const msgResponse = await firestore().collection('Chats')
    .doc(docid)
    .collection('messages')
    .orderBy('createdAt', "desc")
    .get()
    const allTheMsgs = msgResponse.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt:docSanp.data().createdAt.toDate()
      }
    })
    setMessages(allTheMsgs)
  }
  
  useEffect(() => {
    getAllMessages()
  },[]);

  const onSend = (msgArray) => {
    const msg = msgArray[0]
    const usermsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date()
    }
    console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt )

    setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
    const docid = uid > user.uid ? user.uid+ "-" +uid : uid+ "-" +user.uid
    
    firestore().collection('Chats')
    .doc(docid)
    .collection('messages')
    .add({...usermsg,createdAt:firestore.FieldValue.serverTimestamp()})
  }


  return (
     <GiftedChat 
     style={{flex: 1}}
     messages={messages}
     onSend={text => onSend(text)}
     user={{ 
       _id: user.uid,
      }}
       renderBubble={(props)=>{
                    return <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor:"#009387",

                      }
                      
                    }}
                  />
                }}

                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                     containerStyle={{borderTopWidth: 1.5, borderTopColor: '#009387'}} 
                     textInputStyle={{ color: "black" }}
                     />
                }}
      />
  );
};

const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }, 
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Verdana'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ChatScreen;
