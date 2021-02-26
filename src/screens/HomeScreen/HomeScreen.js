import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput,StyleSheet ,TouchableOpacity,Platform ,View, PermissionsAndroid, Alert, Image, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config';
export default function HomeScreen(props) {  

  const [geolocaton ,stgeoloction]= useState({ready:false,where:{lat:null,lot:null},error:null});
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
    const [fullname,setfullname]=useState();
    const [telephone,settelphone]=useState()
    const [email,seteail]=useState();
    const [loction,setlocation]=useState(); 
  const userID = props.extraData.id;
  useEffect(() => {
      let geooption={
        acrity: true,
        timeout:2000,
        maximanage:60*60,
      }
      stgeoloction({
        ...geolocaton,ready:false,error:null
      })
    navigator.geolocation.getCurrentPosition(geosucce,getfaild,geooption);
    firebase.firestore().collection('users')
    .doc(userID)
    .onSnapshot(documentSnapshot => {
       setfullname(
        documentSnapshot.data().fullName
       )
       settelphone(
        documentSnapshot.data().telnum  
       )
       seteail(
        documentSnapshot.data().email  
       )
    });
    
  }, [])
 const geosucce=(position)=>{
  stgeoloction({
    ...geolocaton,ready:true,
    where:{
      lat:position.coords.latitude,
      lot:position.coords.longitude,
    }
  })
 }
 const getfaild=(err)=>{
  stgeoloction({
    ...geolocaton,error : err.message,
  })    
}
   const testerlocalistion=()=>{
    let geooption={
      acrity: true,
      timeout:2000,
      maximanage:60*60,
    }
    stgeoloction({
      ...geolocaton,ready:false,error:null
    })
  navigator.geolocation.getCurrentPosition(geosucce,getfaild,geooption)
 

   }
    const  onpress=()=>{
    if(geolocaton.ready)
      {
        __startCamera();
      }else{
        testerlocalistion();
      }

    }
    const __startCamera = async()=> {
      props.navigation.navigate('CameraScreen', {namiii:fullname, em:email, tel:telephone});
      
    }
    return(
      <>
            {
 (
        <View style={styless.container}>
                <KeyboardAwareScrollView       style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styless.logo}
                    source={require('../../../assets/sssssss.jpg')}
                />
                 <TouchableOpacity style={styless.item} onPress={onpress} >
                <Text style={styless.loginText} >{fullname}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styless.item} >
                <Text style={styless.loginText} >Teniss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styless.item} >
                <Text style={styless.loginText} >Backet ball</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styless.item} >
                <Text style={styless.loginText} >Rekext</Text>
                 </TouchableOpacity>
                 </KeyboardAwareScrollView>
        </View>
          )}
            </>
                )
}
const styless = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
  
  
    item: {
        
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
       backgroundColor: "#7FD8E0",
        marginBottom:20,
       alignSelf: "center",
      },
      logo:{
        flex: 1,
         fontSize:25,
        alignSelf: "center",
      
      }

})

  // const granted =  PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: "Cool Photo App Camera Permission",
      //     message:
      //       "Cool Photo App needs access to your camera " +
      //       "so you can take awesome pictures.",
      //     buttonNeutral: "Ask Me Later",
      //     buttonNegative: "Cancel",
      //     buttonPositive: "OK"
      //   }
      // );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   setHasPermission('granted');
      // //      props.navigation.navigate('CameraScreen', {namiii:fullname, em:email, tel:telephone});
      // } else {
         
      // }