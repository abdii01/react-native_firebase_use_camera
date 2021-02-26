import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { firebase } from './src/firebase/config'
import { Text, View,Image ,StyleSheet} from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import CameraScreen from './src/screens/cameraScrean';
const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const image = { uri: "https://reactjs.org/logo-og.png" };  
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, [])
  return (
  
    <NavigationContainer>
      {
        loading ? (<View style={styles.container}>
          <Image  source={require("./assets/sssssss.jpg")} style={styles.image}/>
        
  </View>) :
               <Stack.Navigator>
               { user ? (
                 <>
                   <Stack.Screen options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#E9B09A',
          },
          headerTintColor: '#2e2e2d',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Home" >
                     {props => <HomeScreen {...props} extraData={user} />}
                   </Stack.Screen>
                  <Stack.Screen options={{
          title: 'Take photo',
          headerStyle: {
            backgroundColor: '#E9B09A',
          },
          headerTintColor: '#2e2e2d',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="CameraScreen" component={CameraScreen} />
               
                         
                 </>
               ) : 
                
                ( <>
                   <Stack.Screen    options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#E9B09A',
          },
          headerTintColor: '#2e2e2d',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Login" component={LoginScreen}  />
                   <Stack.Screen  options={{
          title: 'Sin up',
          headerStyle: {
            backgroundColor: '#E9B09A',
          },
          headerTintColor: '#2e2e2d',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  name="Registration" component={RegistrationScreen} />
   </>
)
               }
             </Stack.Navigator>
        
      }
     </NavigationContainer>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent:'center',
    alignItems:'center',
    justifyContent: "center",
  },
  
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  image :{
     width:"50%",
     height:200,
  }
});