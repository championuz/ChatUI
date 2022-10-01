 import React, { useState, useEffect} from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import ProfileScreen from './screens/ProfileScreen';
 import ChatScreen from './screens/ChatScreen';
 import SignupScreen from './screens/SignupScreen';
 import SigninScreen from './screens/SigninScreen';
 import MessageScreen from './screens/MessageScreen';
 import { StyleSheet } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
 
 const Tab = createBottomTabNavigator();
 const Stack = createNativeStackNavigator();


<Stack.Navigator screenOptions = {{ 
     headerStyle: {
       backgroundColor: '#009387',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold',
     },
    }}>
      <Stack.Screen name="Chats" component={ChatScreen} />
    </Stack.Navigator>
 const msgsName = 'Messages';
 const profileName = 'Profile';

 function TheTab({user}) {
  return (
    <Tab.Navigator
    initialRouteName={msgsName}
    screenOptions = {({ route }) => ({ 
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        if (rn === msgsName ){
         iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
       } else if (rn === profileName){
         iconName = focused ? 'person' : 'person-outline';
       }
       return <Icon name={iconName} size={size} color={color} />
      },
        headerStyle: {
         backgroundColor: '#009387',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       tabBarActiveTintColor: '#009387',
       tabBarInactiveTintColor: 'grey',
       tabBarLabelStyle: {paddingBottom: 5, fontSize: 10, fontWeight: '900'},
      })}
     
    >
    
     <Tab.Screen
      name="Messages"
      >
     {props => <MessageScreen {...props} user={user}/>}
      </Tab.Screen>
      
    <Tab.Screen
      name="Profile"
    >
     {props => <ProfileScreen {...props} user={user}/>}
     </Tab.Screen>
   
  </Tab.Navigator>
  );
}

 const App = () => {
   const [user, setUser] = useState('');

   useEffect(()=> {
     const userCheck = auth().onAuthStateChanged(userExist=>{
       if(userExist)
         setUser(userExist)
       else setUser("")
     })
     return () => {
       userCheck()
       console.log(user);
     }
   },[])

  return(
  
  <NavigationContainer >
        <Stack.Navigator screenOptions = {{ 
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {user?
        <>
         <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
         {props => <TheTab {...props} user={user}/>}
        </Stack.Screen>
        <Stack.Screen name="Chats" options={({route}) => ({ title: route.params.name,
          headerBackTitleVisible: false })}>
        {props => <ChatScreen {...props} user={user}/>}
        </Stack.Screen>
        </>
       
        :
        <>
         <Stack.Screen name="Signin" component={SigninScreen} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}/>
        
        <Stack.Screen name="Signup" component={SignupScreen} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}/>
        </>
        }
        
      </Stack.Navigator>
</NavigationContainer>
 )};


 export default App;

 const styles = StyleSheet.create({
   image: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconColor: {
    color: '009387',
  }
 });
 
 
 