import {StatusBar} from 'expo-status-bar'
import React ,{useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity,ImageBackground} from 'react-native'
import {Camera} from 'expo-camera';
import { firebase } from '../firebase/config';
import ProgressLoader from 'rn-progress-loader';
export default function CameraScreen(props) {
    const [cameraRef, setCameraRef] = React.useState(null);
    const [capturedImage, setCapturedImage] = React.useState(null);
     const [nname,setdata]=React.useState();
     const [emaiil,emalsetdata]=React.useState();
     const [teleph,telsetdata]=React.useState();
     const [imageid, setimageid] = React.useState("");
  const [loading,setloding] =React.useState(false);
   useEffect(() => {
    setdata(
      props.route.params.namiii
    )  
    emalsetdata(
      props.route.params.em
    )  
    telsetdata(
      props.route.params.tel

    ) 
    }, )
     

const idfunction=()=>{
 return  Math.random().toString(36).substr(2, 9)
}
  const CameraPreview = ({photo}) => {

    const restartcamera=()=>{
      setCapturedImage(null)
    }

   
    const Savedataa=async()=>{
      const  image_id =idfunction();
      const responce = await fetch(photo.uri);
      const blob= await responce.blob();
      setimageid(
        image_id
      )   
 const ref =firebase.storage().ref().child(image_id);
return ref.put(blob); 
    }
    const   Savedata=()=>{
      setloding(
        true
      )
        const data= { 
          id: imageid,
          emaiil,
          nname,
          teleph,
          imageid,
        }
      Savedataa().then(()=>{
        const usersRef = firebase.firestore().collection('publiction')
        usersRef
            .doc(imageid)
            .set(data)
            .then(() => {
              setloding(
                false
              )
            }).then(()=>{
              alert("ajouter avec succes")
            })
           .catch((error) => {
            setloding(
              false
            )
                alert(error)
            });
      }).catch((err)=>{
        setloding(
          false
        )
        alert(err);
      })
     }
     return (
 <>
 
        <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: '100%',
            }}
          >
            <ImageBackground
              source={{uri: photo && photo.uri}}
              style={{
                flex: 1
              }}
            />
          
                 <View
            style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between'
            }}
          >
   
            <View
            style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center',
           
   
            }}
            
            >
      
                <TouchableOpacity
              onPress={restartcamera}
                >
                  <Text style={{color:"white",fontSize:30,}}>retart</Text>
                </TouchableOpacity>
                
        </View>
        <View
                style={{   alignSelf: 'center',
                flex: 1,
                alignItems: 'center',}}>

                <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </View>     
        
        <View
            style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center',
      
            }}
            >
                <TouchableOpacity
                   
                    onPress={Savedata}
                >
                             <Text style={{color:"white",fontSize:30,}}>Save</Text>
                </TouchableOpacity>
                
      </View>
        </View>
   
          </View>
        
    
 </> 
     )
    }
    return(
<>
      {
        capturedImage===null ?
        (
        
        <Camera
        style={{ flex: 1 }}  ref={ref => {
          setCameraRef(ref);}}
        >
      
           <View
          style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: 20,
          justifyContent: 'space-between'
          }}
        >

      <View
          style={{
          alignSelf: 'center',
          flex: 1,
          alignItems: 'center'
          }}
          >
              <TouchableOpacity
               onPress={async() => {
                if(cameraRef){
                  let photo = await cameraRef.takePictureAsync();
                  
                  setCapturedImage(photo);
                  
                }
                
              }}
              style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: '#fff'
              }}
              />
              
      </View>
    
      </View>
        </Camera>
        )
         
        :(
          <CameraPreview photo={capturedImage}   /> 
        ) 
        }
</>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})