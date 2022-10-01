
 import React, { useEffect, useState} from 'react';
 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
   Text,
   Image,
   FlatList,
   Button,
   useColorScheme,
   View,
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'
 import { NavigationContainer } from '@react-navigation/native';
 import ChatScreen from './ChatScreen';
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { ScrollView } from 'react-native-virtualized-view';
import firestore from '@react-native-firebase/firestore';

 Icon.loadFont().then();

 const Stack = createNativeStackNavigator();
 
 const MessageScreen = ({user, navigation}) => {
   const [users, setUsers] = useState(null)
 //   const [messages, setMessages] = useState([]);
 console.log(user)
//  
   const getUsers = async ()=> {
   const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
   const allUsers = querySanp.docs.map(docSnap=>docSnap.data())
  //  console.log(allUsers)
   setUsers(allUsers)
 }

 useEffect(()=>{
   getUsers()
 },[])

 
 
   return (
     <SafeAreaView >
       <StatusBar />
        <ScrollView>
         <View style={styles.Contain}>
             <FlatList
                 data={users}
                 keyExtractor={(item)=>item.uid}
                 renderItem={({item}) => (
                     <TouchableOpacity
                     onPress={() => navigation.navigate('Chats', {name: item.name, uid: item.uid})}
                     >
                     <View style={styles.card} >
                         <Image style={styles.userImageST} source={{uri: 'https://placeimg.com/140/140/any'}} />
                         <View style={styles.textArea}>
                         <Text style={styles.nameText} >{item.name}</Text>
                         <Text style={styles.msgTime}>{item.messageTime}</Text>
                         <Text style={styles.msgContent} >{item.email}</Text>
                        </View>
                     </View>
                     </TouchableOpacity>
                 )}
                 />
         </View>
       </ScrollView>
     </SafeAreaView>
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
 
 export default MessageScreen;
 